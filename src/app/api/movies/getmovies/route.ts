import { NextRequest, NextResponse } from 'next/server';
import { getAllMovies } from '../../../service/moviesservice.ts';



export async function GET(req:NextRequest) {
    try {
        const { searchParams } = req.nextUrl;

        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
    
        console.log("Page:", page);
        console.log("Limit:", limit);
        const movies = await getAllMovies(page,limit); 
        if(!movies){
            return new NextResponse('Error fetching movies', { status: 500 } as any);
        }     
        return new NextResponse(JSON.stringify({ message: 'Movies fetched successfully',data: movies}), { status: 200 }as any);
    } catch (error) {
        console.error('Error fetching movies:', error);
        return new NextResponse('Error fetching movies'+error, { status: 500 } as any);
    }
}