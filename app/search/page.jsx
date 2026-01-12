
import SearchBar from "@/componnets/searchBar";
import { APIRequests } from "@/store/api";
import Pagination from "@/componnets/Pagination";
import Card from "@/componnets/card";
import { Suspense } from "react";
import Loader from "@/componnets/Loader";
export default async function Search({ searchParams }) {
  const urlParams = await searchParams;
  const query = urlParams.query;
  const page = urlParams.page;
  const movies = await APIRequests.search(query, page);


  return (
    <>
      <SearchBar />
      <div className="flex flex-wrap gap-10 justify-center">
        <Suspense fallback={<div>Loading...</div>}>
          {
            query ? (
              movies && movies.results && movies.results.length > 0 ? (
                movies.results.map((movie) => (
                  <Card key={movie.id} {...movie} />
                ))
              ) : (
                <p className="text-white text-center">No movies found</p>
              )
            ) : (<p className="text-white text-2xl font-semibold text-center">Search For A Movie</p>
            )
          }
        </Suspense>
      </div>
      {
        movies.total_pages > 1 && (
          <Pagination totalPages={movies?.total_pages} />
        )
      }
    </>
  )
}