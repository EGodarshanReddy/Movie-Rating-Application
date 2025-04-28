import { fetchMovieById } from "../Repository/MovieRepo.ts";
import {NextResponse} from "next/server"
import { addWatchList, fetchWatchListByUserIdAndMovieId } from "../Repository/WatchListRepo.ts";

export async function addWatchListService(movieId:string,userId:string) 
{
    const movie= await fetchMovieById(movieId);
    if(!movie)
    {
        return NextResponse.json({message:"movie not found"},{status:400}as any)
    }
    const WatchList=await fetchWatchListByUserIdAndMovieId(movieId,userId);
    
    if(WatchList)
    {
        return NextResponse.json({message:"movie is already added in watch list"},{status:400}as any)
    }

    
    const addToWatchList=await addWatchList(movieId,userId);
    return addToWatchList;
}
