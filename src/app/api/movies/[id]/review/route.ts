import { getAllReviewsByMovieId } from "@shared/app/service/ReviewService";
import { NextRequest,NextResponse } from "next/server";



export async function GET(req:NextRequest,{params}:{params:Promise<{id:string}>}):Promise<NextResponse> {
    try {
        const { id } = await params;
        const page = parseInt(req.nextUrl.searchParams.get('page') || '1');
        const limit = parseInt(req.nextUrl.searchParams.get('limit') || '10');
        const reviews = await getAllReviewsByMovieId(id,page,limit);
        if(!reviews)
        {
            return NextResponse.json({ message: "Reviews not found" }, { status: 404 }as any);
        }
        return NextResponse.json({ message: "Reviews fetched successfully", data: reviews }, { status: 200 }as any);
    } catch (error) {
        console.log("error",error);
        return NextResponse.json({ message: "Internal server error"+error }, { status: 500 }as any);
    }
}