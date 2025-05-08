import { NextResponse } from "next/server";
import { addWatchedHistory, alreadyExistsWatchedHistory } from "../Repository/WatchedhistoryRepo";



export async function createWatchedList(movieId: string,userId: string,) 
{
    const watchedHistory=await alreadyExistsWatchedHistory(movieId,userId);
    if(watchedHistory)
    {
        return NextResponse.json({message:"movie is already watched"},{status:400})
    }
    return await addWatchedHistory(movieId,userId);
}