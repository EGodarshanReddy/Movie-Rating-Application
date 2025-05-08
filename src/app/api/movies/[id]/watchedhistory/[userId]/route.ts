import { createWatchedList } from "@shared/app/service/watchedHistoryService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,{params}:{params:Promise<{id:string,userId:string}>}):Promise<NextResponse> {
    try {
        const { id,userId } = await params;      

        const watchList= await createWatchedList(id,userId);
        if(watchList instanceof NextResponse)
        {
            return watchList;
        }
        return NextResponse.json({message:"Movie watched successfully"},{status:201});
        
    } catch (error) {
       console.log("internal server error"+error);
        return NextResponse.json({message:"Internal server error "+error},{status:500});
    }
    
}