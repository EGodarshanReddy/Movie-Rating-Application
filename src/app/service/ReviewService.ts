import { fetchMovieById } from "../Repository/MovieRepo.ts";


import { NextResponse } from "next/server";
import { addReview, deleteReviewByid, fetchReviewsByMovieId, getReviewsByMovieIdandUserId, getReviewsByReviewId } from "../Repository/ReviewRepo.ts";

export async function AddReviewService(id: string,userId: string, review: any) {
    const movie = await fetchMovieById(id);
    if (!movie) {
        return NextResponse.json({ message: "Movie not found" }, { status: 404 }as any);
    }    
    const findReview = await getReviewsByMovieIdandUserId(id,userId);   
    if (findReview) {
        return NextResponse.json({ message: "Review already exists" }, { status: 400 }as any);
    }
    const newReview = await addReview(id,userId, review);
    return newReview;
}



export async function fetchReviewsByMovieIdAndUserId(id: string,userId: string) {
    const reviews = await getReviewsByMovieIdandUserId(id, userId);
    if(!reviews) {
        return NextResponse.json({ message: "Review not found" }, { status: 404 }as any);
    }
    return reviews;
}


/**
 * Deletes a review by id
 * @param id The id of the review to be deleted
 * @returns The deleted review on success, or a 404 error if the review is not found
 */
export async function deleteReviewSevice(id: string) {



    const reviews = await getReviewsByReviewId(id);
    if(!reviews) {
        return NextResponse.json({ message: "Review not found" }, { status: 404 }as any);
    }
    return await deleteReviewByid(id);  
    
}


export async function getAllReviewsByMovieId(id: string,page: number,size: number) {
    const reviews = await fetchReviewsByMovieId(id,page,size);
    if(!reviews) {
        return NextResponse.json({ message: "Reviews not found" }, { status: 404 }as any);
    }
    return reviews;
}