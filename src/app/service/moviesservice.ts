import { Movie } from "../../utils/validators/interfaces.ts";
import { NextResponse } from "next/server";
import { addMovie, deleteMovieById, fetchMovieById, findMovieByNameAndLanguage } from "../Repository/MovieRepo.ts";


export async function AddMovieService(movie:Movie) 
{
   const isMoviePresent=await findMovieByNameAndLanguage(movie.title,movie.language);
   if(isMoviePresent)
   {
    return NextResponse.json({ message: 'Movie already exists' }, { status: 400 }as any);
   }
   const newMovie=await addMovie(movie);
   return newMovie;
}  


export async function getAllMovies(page:number,limit:number) {
    return await getAllMovies(page,limit);        
}


export async function getMovie(id: string) {
    return await fetchMovieById(id);
}


export async function deleteMovie(id: string) {
    return await deleteMovieById(id);
}



