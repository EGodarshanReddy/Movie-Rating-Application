import { addWatchListService } from "@shared/app/service/WatchListservice";
import {NextRequest,NextResponse} from "next/server";


export async function POST(_req:NextRequest,{params}:{params:{id:string,userId:string}}) :Promise<NextResponse>
{
    try{

        const {id,userId}=params;

        const addwatchList= await addWatchListService(id,userId)
        if(addwatchList instanceof NextResponse)
        {
            return addwatchList;
        }  
        return NextResponse.json({message:"Movie aadded to watch list successfully"},{status:201}as any)

    }
    catch(error)
    {
        console.log("internal server error"+error);
        return NextResponse.json({message:"Internal server error"+error},{status:500}as any);
    }
}