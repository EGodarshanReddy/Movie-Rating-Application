import  {PrismaClient}  from "@prisma/client";
import { Movie } from "@shared/utils/validators/interfaces";

const prisma= new PrismaClient();

export const findMovieByNameAndLanguage = async (name: string, language: string) => {
    const movie = await prisma.movie.findFirst({
        where: {
            title: name,
            language: language,
        },
    });
    return movie;
}

export const addMovie=async (movie: Movie) => {
    const newMovie = await prisma.movie.create({
        data: movie,
        select: {
          id: true,
          title: true,
          language: true,
          genre: false,
          releaseYear: false,
          posterURL: false,
        },
    });
    return newMovie;
}

//With paginations fetch akll movies

export const fetchAllMovies = async (page: number = 1, limit: number = 10) => {
    const skip = (page - 1) * limit;
  
    const movies = await prisma.movie.findMany({
      skip: skip,
      take: limit,
      orderBy: {
        createdAt: 'desc'  // optional: latest movies first
      }
    });
  
    return movies;
  };
  


  export const fetchMovieById = async (id: string) => {
    const movie = await prisma.movie.findUnique({
      where: {
        id: id,
      },
    });
    return movie;
  };


  export const deleteMovieById = async (id: string) => {
    const movie = await prisma.movie.delete({
      where: {
        id: id,
      },
    });
    return movie;
  };