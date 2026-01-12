"use client"
import Image from "next/image"
import { useProvider } from "@/store/Provider"
import { APIRequests } from "@/store/api"
import { useEffect, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner";
import { profileSchema } from "@/utils/schemas";
function Profile() {
    const { user, setUser } = useProvider();
    const { update } = useSession();
    const [errors, setErrors] = useState({});
    const [profileImg, setProfileImg] = useState(user?.profileImg);

    useEffect(() => { if (!user) { router.push('/') } }, [])
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());





        const result = profileSchema.safeParse(data);

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setErrors(fieldErrors);

            const firstError = Object.values(fieldErrors)[0];
            if (firstError) toast.error(firstError[0]);
            return;
        }


        toast.loading("Updating profile...");

        try {
            const response = await APIRequests.UpdateProfile(user?.id, formData);


            toast.dismiss();


            if (response.status === 408 || response.status === 504) {
                toast.error("Request timed out. Please check your internet connection.");
                return;
            }

            if (response.status === 0) {
                toast.error("Network Error. Please check your connection.");
                return;
            }


            if (response.status >= 200 && response.status < 300) {
                if (response.passwordUpdated) {
                    toast.success("Password updated! Please login again.");
                    await signOut({ redirect: false });
                    router.push('/login');
                } else {
                    toast.success("Profile Updated Successfully");
                    const updatedUser = {
                        ...user,
                        name: response.name,
                        email: response.email,
                        favorites: response.favorites,
                        profileImg: response.profileImg,
                    };
                    setUser(updatedUser);
                    await update(updatedUser);
                }
            } else {

                toast.error(response.error || "An unexpected error occurred.");
            }
        } catch (error) {
            toast.dismiss();
            console.error("Profile update error:", error);
            toast.error("An unexpected error occurred.");
        }
    }



    return (
        <form onSubmit={handleSubmit} className="flex items-center flex-col gap-2 mt-30 w-full h-screen">
            <div className="flex items-center flex-col gap-2 mt-30 w-full h-full">
                <label htmlFor="profileImg" className="relative group cursor-pointer w-[60%] sm:w-[20%] md:w-[20%] aspect-square rounded-full overflow-hidden">
                    <Image
                        src={profileImg}
                        alt="Profile"
                        className="object-cover w-full h-full"
                        width={1000}
                        blurDataURL={'true'}
                        placeholder="blur"
                        height={1000}
                        priority
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white font-semibold">Edit Photo</span>
                    </div>
                </label>
                <input type="file" name="profileImg" id="profileImg" onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => {
                            setProfileImg(reader.result);
                        }
                    }
                }} className="hidden" />

                <div className="w-full flex flex-col items-center">
                    <input name="name" defaultValue={user?.name} id="name" type="text" placeholder="Name" className={`w-min-100 w-[90%]  sm:w-[90%] md:w-[50%] text-center text-white border-b-2 ${errors.name ? 'border-red-500' : 'border-blue-800'} outline-none m-10`} />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name[0]}</span>}
                </div>

                <div className="w-full flex flex-col items-center">
                    <input name="email" defaultValue={user?.email} id="email" type="text" placeholder="Email" className={`w-min-100 w-[90%]  sm:w-[90%] md:w-[50%] text-center text-white border-b-2 ${errors.email ? 'border-red-500' : 'border-blue-800'} outline-none m-10`} />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email[0]}</span>}
                </div>

                <div className="w-full flex flex-col items-center">
                    <input name="password" id="password" type="password" placeholder="New Password" className={`w-min-100 w-[90%] sm:w-[90%] md:w-[50%] text-center text-white border-b-2 ${errors.password ? 'border-red-500' : 'border-blue-800'} outline-none m-10`} />
                    {errors.password && <span className="text-red-500 text-sm">{errors.password[0]}</span>}
                </div>

                <div className="w-full flex flex-col items-center">
                    <input name="confirmPassword" id="confirmPassword" type="password" placeholder="Confirm Password" className={`w-min-100 w-[90%] sm:w-[90%] md:w-[50%] text-center text-white border-b-2 ${errors.confirmPassword ? 'border-red-500' : 'border-blue-800'} outline-none m-10`} />
                    {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword[0]}</span>}
                </div>

                <input onChange={() => { }} name="submit" id="submit" type="submit" value="Update" className="bg-blue-500 text-white px-4 py-2 rounded m-10 cursor-pointer hover:bg-blue-600 transition" />
            </div>
        </form>
    )
}

export default Profile;