
import SearchBar from "@/componnets/searchBar";
import { APIRequests } from "@/store/api";
import Card from "@/componnets/card";
export default  async function Search({searchParams}) {
  const searchQuery = await searchParams;
  const query = searchQuery.query;
  const movies = await APIRequests.search(query);
  console.log(query);
  return (      
    <>
        <SearchBar/>
         <div className="flex flex-wrap gap-10 justify-center">
           
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
        </div>
    </>
  )
}