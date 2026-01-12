import { APIRequests } from "@/store/api";
import Image from "next/image";
import { FaHeart, FaStar } from "react-icons/fa";
import TrailerButton from "@/componnets/TrailerButton";
import Heart from "@/componnets/Heart";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const movieData = await APIRequests.movie(id);
  const movie = movieData[0];

  return {
    title: movie ? `${movie.title} - MoviezLand` : 'Movie Details - MoviezLand',
    description: movie?.overview || 'Movie details and trailer',
  }
}

export default async function MovieDetails({ params }) {
  const { id } = await params;
  let movieResult = await APIRequests.movie(id);
  const trailerPath = movieResult[1];
  const movie = movieResult[0] ? movieResult[0] : 'No Trailer Available';

  let imageUrl;
  if (!movie.poster_path || movie.poster_path === 'null' || movie.poster_path === 'undefined') {
    imageUrl = '/placeholderimage.png';
  } else {
    imageUrl = `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${movie.poster_path}`;
  }

  return (
    <div className="relative min-h-screen text-white bg-[#0B1120]">
      <div className="absolute inset-0">
        <Image
          src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-10 lg:gap-16 pt-32 md:pt-44 px-6 md:px-12 lg:px-20 py-12">
        <div className="relative w-[280px] h-[420px] mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl shadow-black/80 ring-1 ring-white/10 shrink-0">
          <Image
            src={`${imageUrl}`}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col justify-center max-w-4xl text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-black mb-2 tracking-tight">{movie.title}</h1>
          {movie.tagline && (
            <p className="text-blue-400 italic text-lg md:text-xl mb-6 font-medium opacity-90">{movie.tagline}</p>
          )}

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-8 mb-8 text-gray-300 font-medium">
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/10">
              <FaStar className="text-yellow-400" />
              <span className="text-white text-lg">{movie.vote_average?.toFixed(1)}</span>
            </div>
            <span className="opacity-60">|</span>
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <span className="opacity-60">|</span>
            <span>{movie.runtime} min</span>
          </div>

          <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0 font-light">
            {movie.overview}
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-10">
            <span className="bg-blue-600 text-white font-bold px-5 py-1.5 rounded-full text-xs uppercase tracking-wider shadow-lg shadow-blue-600/20">
              {movie.status}
            </span>
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-white/5 backdrop-blur-md border border-white/10 px-5 py-1.5 rounded-full text-sm font-medium hover:bg-white/10 transition-colors"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full">
            <TrailerButton trailerPath={trailerPath} />
            <Heart movieId={movie.id} isComplete={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
