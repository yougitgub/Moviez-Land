import Card from "@/componnets/card";
import { APIRequests } from "@/store/api"
import Pagination from "@/componnets/Pagination";

export default async function Trendings({ searchParams }) {
    const { page } = await searchParams;
    const trendings = await APIRequests.trending(page)

    return (
        <>
            <p className="text-7xl font-bold mt-30  text-center text-blue-500 ">Trending Movies</p>
            <div className="flex flex-wrap gap-10 justify-center">
                {
                    trendings.results.map((movie) => {
                        return <Card key={movie.id} {...movie} />
                    })
                }
            </div>
            {
                trendings.total_pages > 1 && (
                    <Pagination totalPages={trendings?.total_pages} />
                )
            }
        </>
    )
}
