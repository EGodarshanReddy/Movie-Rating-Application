import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export async function addWatchList(movieId: string, userId: string) {

    const addWatchList = await prisma.watchlist.create({
        data: {
            movieId: movieId,
            userId: userId
        }
    }

    );
    return addWatchList;
}


export async function deleteWatchList(movieId: string, userId: string) {
    const deleteWatchList=await prisma.watchlist.delete({
        where: {
            userId_movieId: {
                userId: userId,
                movieId: movieId
            }
        }
    });
    return deleteWatchList;
}



export async function fetchWatchListByUserIdAndMovieId(movieId: string, userId: string) {

    const fetchWatchList= await prisma.watchlist.findUnique(
        {
            where: {
                userId_movieId: {
                    userId: userId,
                    movieId: movieId
                }
            }
        }
    )
    return fetchWatchList;
}

export async function getWatchListByUserId(userId: string) {
    return await prisma.watchlist.findMany({
      where: {
        userId: userId,
      },
      include: {
        movie: true, 
      },
    });
  }
  

  export async function deleteALLMovieFromWatchListByUserId(userId: string) {
    return await prisma.watchlist.deleteMany({
      where: {
        userId: userId,
      },
    });
  }