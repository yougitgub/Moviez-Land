"use client"
import { Link } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const router = useRouter();
  const heroImageUrl = "https://c4.wallpaperflare.com/wallpaper/862/449/162/jack-reacher-star-wars-interstellar-movie-john-wick-wallpaper-preview.jpg"

  return (
    <div className="relative w-full h-[550px] md:h-[700px] overflow-hidden">

      <div
        className="absolute inset-0 bg-cover bg-center rounded-2xl transition-opacity duration-1000"
        style={{ backgroundImage: `url(${heroImageUrl})` }}
      >
        <div className="absolute inset-0 bg-gray-900/70 backdrop-brightness-75" style={{ backgroundColor: 'rgba(25, 36, 64, 0.7)' }}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#192440] via-transparent to-[#192440]/50"></div>
        </div>
      </div>

      <div className="relative container mx-auto h-full flex flex-col items-center justify-center text-center p-4">

        <div className="p-8 sm:p-12 rounded-2xl backdrop-blur-md bg-black/20 max-w-4xl transition-all duration-500">


          <h1 className="text-5xl sm:text-7xl font-extrabold text-white mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
            Moviez Land
          </h1>

          <p className="text-lg sm:text-xl text-cyan-400 max-w-2xl mb-10 font-medium tracking-wide">
            Your destination for the latest releases and trending entertainment.
          </p>
          <button
            onClick={() => router.push('/trendings')}
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
