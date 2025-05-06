
import { AddReviewService, fetchReviewsByMovieIdAndUserId } from "@shared/app/service/ReviewService";
import { reviewSchema } from "@shared/utils/validators/movie.schema";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest,{params}:
    {params:Promise<{id:string,userId:string}>}):Promise<NextResponse> {
    try {
        const { id,userId } =await params;
        const review = await request.json();
        console.log("review",review);

        const isValidReviewData = reviewSchema.safeParse(review);
        
        if (!isValidReviewData.success) {
            return NextResponse.json({ errors: isValidReviewData.error.flatten().fieldErrors }, { status: 400 }as any);
        }
        const addReview = await AddReviewService(id,userId,review)
        if (addReview instanceof NextResponse) {
            return addReview;
        }
        return NextResponse.json({ message: 'Review added successfully',addReview }, { status: 201 }as any);
        
    } catch (error) {
        console.error('Error adding review:', error);
        return NextResponse.json({ message: "Internal server error" +error}, { status: 201 }as any);
    }    
}


export async function GET(req:NextRequest,{params}:{params:{id:string,userId:string}}):Promise<NextResponse> {
    try {
        const { id,userId } = params;
        const reviews = await fetchReviewsByMovieIdAndUserId(id,userId);
       if(reviews instanceof NextResponse)
       {
           return reviews;
       }
        return NextResponse.json({ message: "Review fetched successfully", data: reviews }, { status: 200 }as any);
    } catch (error) {
        console.log("error",error);
        return NextResponse.json({ message: "Internal server error"+error }, { status: 500 }as any);
    }
}


