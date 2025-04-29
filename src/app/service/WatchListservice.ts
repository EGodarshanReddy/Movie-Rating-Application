
import {NextResponse} from "next/server"
import { addWatchList, deleteALLMovieFromWatchListByUserId, deleteWatchList,fetchWatchListByUserIdAndMovieId, getWatchListByUserId } from "../Repository/WatchListRepo";
import { fetchMovieById } from "../Repository/MovieRepo";
import { isUserExists } from "../Repository/userrepo";


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
        return NextResponse.json({message:"movie is already added in watch list"},{status:400})
    }

    
    const addToWatchList=await addWatchList(movieId,userId);
    return addToWatchList;
}


export async function deleteMovieFromWatchListService(movieId:string,userId:string) 
{
    const deleteMovieFromWatchList=await fetchWatchListByUserIdAndMovieId(movieId,userId);
    if(!deleteMovieFromWatchList)
    {
        return NextResponse.json({message:"movie not found in watch list"},{status:400}as any)
    }
    const deletemovieFromWatchList=await deleteWatchList(movieId,userId);
    return deletemovieFromWatchList;
}


export async function getAllWatchListByUserId(userId:string)
{
    const user= await isUserExists(userId);
    if(user===false)
    {
        return NextResponse.json({message:"user not found"},{status:400}as any)
    }
    const watchList=await getWatchListByUserId(userId);
    return watchList;
}


export async function deleteALLMovieFromWatchListService(userId:string)
{
    const user= await isUserExists(userId);
    if(user===false)
    {
        return NextResponse.json({message:"user not found"},{status:400}as any)
    }
    const deleteALLMovieFromWatchList=await deleteALLMovieFromWatchListByUserId(userId);
    return deleteALLMovieFromWatchList;
}