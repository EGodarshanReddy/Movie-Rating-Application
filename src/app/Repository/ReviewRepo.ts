import {PrismaClient, Review } from "@prisma/client";

const prisma= new PrismaClient();


export async function addReview(movieId: string,userId: string, review: Omit<Review, 'id' | 'createdAt' | 'movieId'|'userId' >) {
    return await prisma.review.create({
      data: {
        movieId,
        userId,
        ...review,
      },
      select: {
        id: true,
      }
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


  export async function deleteReviewByid(id: string) {
    return await prisma.review.deleteMany({
      where: {
        id,
      },
    });
  }


  export async function getReviewsByReviewId(id: string) {
    return await prisma.review.findFirst({
      where: {
        id,
      },
    });
  }


  export async function fetchReviewsByMovieId(id: string, page: number, size: number) {
  const skip = (page - 1) * size;
  
  const reviews = await prisma.review.findMany({
    where: {
      movieId: id,
    },
    skip: skip,
    take: size,
    orderBy: {
      createdAt: 'desc', // Latest reviews first (optional)
    },
  });
  return reviews;
}


export async function updateReview(id: string, review: Partial<Review> & Omit<Review, 'id' | 'createdAt' | 'movieId'|'userId' >) {
  return await prisma.review.update({
    where: {
      id,
    },
    data: {
      ...review,
    },
    select: {
      id: true,
      rating: true,
      comment: true,      
    },
  });
}