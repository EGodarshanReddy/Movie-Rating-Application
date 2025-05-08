import { deleteReviewSevice, fetchReviewsByMovieIdAndUserId, updateReviewService } from "@shared/app/service/ReviewService";
import { reviewSchema } from "@shared/utils/validators/movie.schema";
import { NextResponse, NextRequest } from "next/server";







export async function DELETE(_req:NextRequest,{ params }: { params:Promise< { id: string } > } ) {
    try{
        const { id } =  await params;
        const deleteReviews = await await deleteReviewSevice(id);
        if(deleteReviews instanceof NextResponse)
        {
            return deleteReviews;
        }
       
        return NextResponse.json({ message: "Review deleted successfully" }, { status: 200 }as any);    }
    catch(error)
    {
        console.log("error",error);
        return NextResponse.json({ message: "Internal server error"+error }, { status: 500 }as any);
    }
}

export async function PUT(request: NextRequest,{params}:{params:Promise< { id: string } >}):Promise<NextResponse> {
    try {
        const { id} = await params;
        const review = await request.json();
        console.log("review",review);
        const isValidReviewData = reviewSchema.safeParse(review);
        
        if (!isValidReviewData.success) {
            return NextResponse.json({ errors: isValidReviewData.error.flatten().fieldErrors }, { status: 400 }as any);
        }
        const updateReview = await updateReviewService(id,review)
        if (updateReview instanceof NextResponse) {
            return updateReview;
        }
        return NextResponse.json({ message: 'Review added successfully' ,updateReview}, { status: 201 }as any);
        
    } catch (error) {
        console.error('Error adding review:', error);
        return NextResponse.json({ message: "Internal server error" +error}, { status: 201 }as any);
    }
}
