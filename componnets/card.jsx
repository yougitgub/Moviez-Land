
import Heart from "./Heart";
import Link from "next/link";
import Image from "next/image";
import { FaHeart, FaStar } from "react-icons/fa";
import { Suspense } from "react";
import { Loader } from "lucide-react";

function Card({ ...movie }) {
  let imageUrl;
  if (movie.poster_path == null || movie.poster_path == undefined || movie.poster_path == '' || movie.poster_path == 'null' || movie.poster_path == 'undefined' || movie.poster_path == ' ') {
    imageUrl = '/placeholderimage.png';
  } else {
    imageUrl = `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${movie.poster_path}`;
  }
  return (
    <div className="relative group w-[220px] h-[330px] rounded-2xl overflow-hidden shadow-lg shadow-black/50 mx-4 my-6">
      <Link href={`/movie/${movie.id}`}>
        <Suspense fallback={<Loader />}>
          <Image
            src={imageUrl.trim()}
            alt={movie.title}
            width={220}
            height={330}
            loading="lazy"
            blurDataURL="data"
            placeholder="blur"
            className="object-cover relative transition-transform  duration-300 hover:scale-110"
          />
        </Suspense>
      </Link>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col justify-end p-3">
        <h3 className="text-white font-semibold text-sm truncate">{movie.title}</h3>
        <div className="flex items-center gap-2 text-yellow-400 text-xs">
          <FaStar />
          <span className="text-white">{movie.vote_average?.toFixed(1)}</span>
        </div>
      </div>

      <Heart movieId={movie.id} />
    </div>
  );
}

export default Card;
