import { fetchMovieById } from "../Repository/MovieRepo.ts";


import { NextResponse } from "next/server";
import { addReview, getReviewsByMovieIdandUserId } from "../Repository/ReviewRepo.ts";

export async function AddReviewService(id: string, review: any) {
    const movie = await fetchMovieById(id);
    if (!movie) {
        return NextResponse.json({ message: "Movie not found" }, { status: 404 }as any);
    }    
    const findReview = await getReviewsByMovieIdandUserId(id,review.userId);   
    if (findReview) {
        return NextResponse.json({ message: "Review already exists" }, { status: 400 }as any);
    }
    const newReview = await addReview(id, review);
    return newReview;
}



export async function fetchReviewsByMovieIdAndUserId(id: string,userId: string) {
    const reviews = await getReviewsByMovieIdandUserId(id, userId);
    if(!reviews) {
        return NextResponse.json({ message: "Review not found" }, { status: 404 }as any);
    }
    return reviews;
}