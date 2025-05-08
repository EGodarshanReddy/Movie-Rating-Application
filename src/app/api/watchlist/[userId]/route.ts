import { deleteALLMovieFromWatchListService, deleteMovieFromWatchListService, getAllWatchListByUserId } from "@shared/app/service/WatchListservice";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req:NextRequest,{params}:{params:Promise<{userId:string}>}) :Promise<NextResponse>
{
    try{

        const {userId}= await params;

       const watchList= await getAllWatchListByUserId(userId);
       if(watchList instanceof NextResponse)
       {
           return watchList;
       }      
       return NextResponse.json({message:"Watch list fetched successfully",data:watchList},{status:200})

    }
    catch(error)    
    {
        console.log("internal server error"+error);
        return NextResponse.json({message:"Internal server error"+error},{status:500});
}}  


export async function DELETE(_req:NextRequest,{params}:{params:Promise<{userId:string}>}) :Promise<NextResponse>
{
    try{
        const {userId}= await params;
        const deletemovieFromWatchList= await deleteALLMovieFromWatchListService(userId)
        if(deletemovieFromWatchList instanceof NextResponse)
        {
            return deletemovieFromWatchList;
        }      
        return NextResponse.json({message:"Movie deleted from watch list successfully"},{status:200})
    }
    catch(error)
    {
        console.log("internal server error"+error);
        return NextResponse.json({message:"Internal server error"+error},{status:500});
    }

}