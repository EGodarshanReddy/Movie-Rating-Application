

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



export async function alreadyExistsWatchedHistory(movieId: string,userId: string) {
    const watchedHistory = await prisma.watchedHistory.findFirst({
        where: {
            userId: userId,
            movieId: movieId
        },
        select: {
            id: true
        }
    });
    return !!watchedHistory;
}


export async function addWatchedHistory(movieId: string, userId: string) {
    const added = await prisma.watchedHistory.create({
      data: {
        movieId: movieId,
        userId: userId,
      },
    });
    return added;
  }
  