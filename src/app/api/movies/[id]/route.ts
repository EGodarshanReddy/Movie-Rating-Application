import { NextRequest, NextResponse } from "next/server";
import { getMovie } from "../../../service/moviesservice.ts";
import { deleteMovie } from "../../../service/moviesservice.ts";

export async function GET(_req:NextRequest,{ params }: { params: { id: string } }) {
    try{
        const { id } = params;

        const movie = await getMovie(id);
        if(!movie)
        {
            return NextResponse.json({ message: "Movie not found" }, { status: 404 }as any);
        }
        return NextResponse.json({ message: "Movie fetched successfully", data: movie }, { status: 200 }as any);    }
    catch(error)
    {
        console.log("error",error);
        return NextResponse.json({ message: "Internal server error"+error }, { status: 500 }as any);
    }
}


export async function DELETE(_req:NextRequest,{ params }: { params: { id: string } }) {
    try{
        const { id } = params;
        const movie = await getMovie(id);
        if(!movie)
        {
            return NextResponse.json({ message: "Movie not found" }, { status: 404 }as any);
        }


        await deleteMovie(id);
        return NextResponse.json({ message: "Movie deleted successfully" }, { status: 200 }as any);    }
    catch(error)
    {
        console.log("error",error);
        return NextResponse.json({ message: "Internal server error"+error }, { status: 500 }as any);
    }
}

