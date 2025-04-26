import { NextRequest,NextResponse } from "next/server";
import { getReviewsByMovieIdandUserId } from "../../../../Repository/ReviewRepo.ts";



export async function getAllReviewsbyMovieId(req:NextRequest,{params}:{params:{id:string}}):Promise<NextResponse> {
    try {
        const { id } = params;
        const reviews = await getReviewsByMovieIdandUserId(id,"");
        if(!reviews)
        {
            return NextResponse.json({ message: "Review not found" }, { status: 404 }as any);
        }
        return NextResponse.json({ message: "Review fetched successfully", data: reviews }, { status: 200 }as any);
    } catch (error) {
        console.log("error",error);
        return NextResponse.json({ message: "Internal server error"+error }, { status: 500 }as any);
    }
}
    
