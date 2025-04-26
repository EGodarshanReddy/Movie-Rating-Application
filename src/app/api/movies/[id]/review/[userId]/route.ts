
import { NextResponse, NextRequest } from "next/server";
import { AddReviewService } from "../../../../../service/ReviewService.ts";
import { reviewSchema } from "../../../../../../utils/validators/movie.schema.ts";
export async function POST(request: NextRequest,{params}:{params:{id:string,userId:string}}):Promise<NextResponse> {
    try {
        const { id,userId } = params;
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
        return NextResponse.json({ message: 'Review added successfully' }, { status: 201 }as any);
        
    } catch (error) {
        console.error('Error adding review:', error);
        return NextResponse.json({ message: "Internal server error" +error}, { status: 201 }as any);
    }    
}