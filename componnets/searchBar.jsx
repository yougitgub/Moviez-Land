"use client"
import { APIRequests } from "@/store/api";
import { useRouter, useSearchParams, usePathname, redirect } from "next/navigation";
import Card from "./card";
export default  function SearchBar(){
    const pathName = usePathname();
    const router = useRouter();
    
    
    
    const handleClick = (e) => {
        if (pathName !== "/search") {
            redirect("/search");
        }
      console.log(e.target.value);
    }
    const  handleChange = async (e) => {
        const query = e.target.value;
        router.replace(`/search?query=${query}`);
        
    }
    return(
        <>
        <div className="w-full h-20  text-white flex items-center justify-center text-3xl font-bold mt-30 ">
            <input type="text" placeholder="Search for a movie..." onChange={(e)=>handleChange(e)} onClick={(e)=>handleClick(e)} className="focus:outline-0 w-1/2 h-10 rounded-lg p-2 text-white text-center border-b-2 border-b-black"/>
        </div>
       
        </>
        
    )
}