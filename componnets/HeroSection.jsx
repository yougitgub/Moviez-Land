"use client"
import { Link, Search } from 'lucide-react';
import { redirect } from 'next/dist/server/api-utils';
/**
 * HeroSection Component
 * A large, cinematic introductory section for the movie website with a deep navy theme.
 * Uses cyan/teal accents to complement the dark blue background for a modern, high-tech look.
 * Note: Assumes a SearchBar component is available to be passed as a prop.
 */
export default function HeroSection() {
  // Placeholder image URL - using a dark background to match the navy theme
  const heroImageUrl = "https://c4.wallpaperflare.com/wallpaper/862/449/162/jack-reacher-star-wars-interstellar-movie-john-wick-wallpaper-preview.jpg"


  return (
    <div className="relative w-full h-[550px] md:h-[700px] overflow-hidden">
      
      {/* Background with Gradient Overlay and Placeholder Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center rounded-2xl transition-opacity duration-1000"
        style={{ backgroundImage: `url(${heroImageUrl})` }}
      >
        {/* Cinematic dark overlay with deep navy base and subtle blur */}
        <div className="absolute inset-0 bg-gray-900/70 backdrop-brightness-75" style={{backgroundColor: 'rgba(25, 36, 64, 0.7)'}}>
            {/* Subtle radial gradient for depth, emphasizing the center */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#192440] via-transparent to-[#192440]/50"></div>
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative container mx-auto h-full flex flex-col items-center justify-center text-center p-4">
        
        {/* Content Box with Blur for added separation and style */}
        <div className="p-8 sm:p-12 rounded-2xl backdrop-blur-md bg-black/20 max-w-4xl transition-all duration-500">

            
            {/* Main Title - Large and bold white text */}
            <h1 className="text-5xl sm:text-7xl font-extrabold text-white mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
                Moviez Land
            </h1>

            {/* Subtitle / Tagline - Cyan/Teal accent for premium look */}
            <p className="text-lg sm:text-xl text-cyan-400 max-w-2xl mb-10 font-medium tracking-wide">
                Your destination for the latest releases and trending entertainment.
            </p>
            {/* Call to Action Button - Cyan/Teal gradient for clean, modern impact */}
            <button 
            href='/trendings'
                className="px-10 py-4 mx-auto text-xl bg-gradient-to-r from-teal-500 to-cyan-600 text-white  font-bold rounded-full 
                           shadow-2xl shadow-cyan-500/50 
                           hover:from-teal-600 hover:to-cyan-700 transition duration-300 transform hover:scale-[1.03] active:scale-95 
                           ring-4 ring-cyan-400/50
                           hover:cursor-pointer
                           "
                    
            >
                Explore Trendings
            </button>
        </div>
      </div>
    </div>
  );
}
