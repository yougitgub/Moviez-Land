"use client";
import { FaHeart } from "react-icons/fa";
import { useProvider } from "@/store/Provider";
import { APIRequests } from "@/store/api";
import Link from "next/link";
import Card from "@/componnets/card";
import { useEffect, useState } from "react";
export default function FavoritesMovies() {
  const { user } = useProvider();
  const [movies, setMovies] = useState([]);




  useEffect(() => {
    if (!user || !user.favorites || user.favorites.length === 0) {
      setMovies([]);
      return;
    }

    const fetchFavorites = async () => {
      try {
        const promises = user.favorites.map(id => APIRequests.movie(id));
        const results = await Promise.all(promises);
        setMovies(results.map(item => item[0]));
      } catch (err) {
        console.error("Error fetching favorite movies:", err);
      }
    };

    fetchFavorites();
  }, [user?.favorites]);

  return (
    <div>
      {!user ? (
        <div className="flex flex-col justify-center  items-center h-[50vh]">
          <FaHeart className="text-2xl bg-transparent text-blue-300" size={100} />
          <p className="text-2xl text-center text-blue-600 block font-bold">You Should <Link href="/login" className="text-blue-400 font-bold hover:text-blue-800">Login</Link> to see your favorite movies</p>
        </div>
      ) : (
        <section className="w-[90%] mt-[5%] mx-auto">
          <p className="text-6xl mt-5 sm:mt-0 text-center text-blue-600 font-bold">Your Favorites </p>
          <div className="flex flex-wrap gap-20">
            {movies.map((movie, index) => (
              <div key={movie.id}>
                <Card {...movie} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}