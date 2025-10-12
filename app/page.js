import Image from "next/image";

import { APIRequests } from "@/store/api"; 
import SearchBar from "@/componnets/searchBar";
import Card from "@/componnets/card";
import HeroSection from "@/componnets/HeroSection";


export default async function Home() {

  const movies = await APIRequests.movies()
  
  return (
    <>
      {/* The Header is now fixed at the top */}
      {/* <Header />  */}

      {/* Main Content Wrapper: Added pt-24 (padding top) to account for the fixed header height */}
      <div className="font-sans min-h-screen pt-24 p-8 pb-20 sm:p-20 bg-slate-900 text-white">
        
        {/* Content starts here, ensuring the SearchBar is below the header */}
      
        <HeroSection SearchBarComponent={SearchBar}/>
        <main className="flex flex-col gap-[32px] items-center sm:items-start mt-10">
          <div className="flex flex-wrap gap-10 justify-center">
            {movies?.results.map((movie)=> ( 
              <Card key={movie.id} {...movie} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
