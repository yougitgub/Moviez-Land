"use client"
import { useRouter, usePathname } from "next/navigation";
export default function SearchBar() {
    const pathName = usePathname();
    const router = useRouter();



    const handleClick = (e) => {
        if (pathName !== "/search") {
            router.push("/search");
        }

    }
    const handleChange = async (e) => {
        const query = e.target.value;
        router.replace(`/search?query=${query}`);

    }
    return (
        <>
            <div className="w-full h-20  text-white flex items-center justify-center text-3xl font-bold mt-30 ">
                <input type="text" placeholder="Search for a movie..." onChange={(e) => handleChange(e)} onClick={(e) => handleClick(e)} className="focus:outline-0 w-[80%] h-10 rounded-lg p-2 text-white text-center border-b-2 border-b-blue-400" />
            </div>

        </>

    )
}