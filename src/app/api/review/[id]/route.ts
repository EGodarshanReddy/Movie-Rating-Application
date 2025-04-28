import { NextResponse, NextRequest } from "next/server";
import { deleteReviewSevice, fetchReviewsByMovieIdAndUserId, updateReviewService } from "../../../service/ReviewService.ts";
import { reviewSchema } from "../../../../utils/validators/movie.schema.ts";



export async function GET(_req:NextRequest,{params}:{params:{id:string,userId:string}}):Promise<NextResponse> {
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


export async function DELETE(_req:NextRequest,{ params }: { params: { id: string } }) {
    try{
        const { id } = params;
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

export async function PUT(request: NextRequest,{params}:{params:{id:string}}):Promise<NextResponse> {
    try {
        const { id} = params;
        const review = await request.json();
        console.log("review",review);
        const isValidReviewData = reviewSchema.safeParse(review);
        
        if (!isValidReviewData.success) {
            return NextResponse.json({ errors: isValidReviewData.error.flatten().fieldErrors }, { status: 400 }as any);
        }
        const addReview = await updateReviewService(id,review)
        if (addReview instanceof NextResponse) {
            return addReview;
        }
        return NextResponse.json({ message: 'Review added successfully' }, { status: 201 }as any);
        
    } catch (error) {
        console.error('Error adding review:', error);
        return NextResponse.json({ message: "Internal server error" +error}, { status: 201 }as any);
    }
}


