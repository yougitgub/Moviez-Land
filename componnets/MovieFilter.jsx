"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import "@/componnets/css/movieFilter.css";

const GENRES = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
];

export default function MovieFilter() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [selectedGenres, setSelectedGenres] = useState([]);

    useEffect(() => {
        const genres = searchParams.get("genres");
        if (genres) {
            setSelectedGenres(genres.split(",").map(Number));
        } else {
            setSelectedGenres([]);
        }
    }, [searchParams]);

    const toggleGenre = (genreId) => {
        const params = new URLSearchParams(searchParams.toString());
        const newSelected = selectedGenres.includes(genreId)
            ? selectedGenres.filter((id) => id !== genreId)
            : [...selectedGenres, genreId];

        if (newSelected.length > 0) {
            params.set("genres", newSelected.join(","));
        } else {
            params.delete("genres");
        }

        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const clearFilters = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("genres");
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="movie-filter-wrapper">
            <div className="category-container">
                <button
                    onClick={clearFilters}
                    className={`genre-chip ${selectedGenres.length === 0 ? "genre-chip-active" : ""}`}
                >
                    All
                </button>
                {GENRES.map((genre) => (
                    <button
                        key={genre.id}
                        onClick={() => toggleGenre(genre.id)}
                        className={`genre-chip ${selectedGenres.includes(genre.id) ? "genre-chip-active" : ""
                            }`}
                    >
                        {genre.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
