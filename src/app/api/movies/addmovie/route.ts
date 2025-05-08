
import { AddMovieService } from '@shared/app/service/moviesservice';
import { Movie } from '@shared/utils/validators/interfaces';
import { movieSchema } from '@shared/utils/validators/movie.schema';
import { NextResponse,NextRequest } from 'next/server';

//comment
export async function POST(request: NextRequest):Promise<NextResponse> {
    try {
        const movie:Movie = await request.json();
        console.log("title",movie.title);
        console.log("description",movie.description);          
        const isValidMovieData = movieSchema.safeParse(movie);
        if (!isValidMovieData.success) {            
            return NextResponse.json({ errors: isValidMovieData.error.flatten().fieldErrors }, { status: 400 }as any);
        }
        const addMovie = await AddMovieService(movie)
        if (addMovie instanceof NextResponse) {
            return addMovie;
        }
        return NextResponse.json({ message: 'Movie added successfully', addMovie }, { status: 201 }as any);
        
    } catch (error) {
        console.error('Error adding movie:', error);
        return NextResponse.json({ message: "Internal server error" +error}, { status: 201 }as any);
    }
}
