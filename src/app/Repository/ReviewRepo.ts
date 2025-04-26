import { Review,PrismaClient } from "@prisma/client";
const prisma= new PrismaClient();


export async function addReview(movieId: string, review: Omit<Review, 'id' | 'createdAt' | 'movieId' >) {
    return await prisma.review.create({
      data: {
        movieId,
        ...review,
      },
    });
  }

  export async function getReviewsByMovieIdandUserId(movieId: string, userId: string) {
    return await prisma.review.findFirst({
      where: {
        movieId,
        userId,  
      },
    });
  }


 