import { NextRequest, NextResponse } from "next/server";
import { LoginSchema } from "../../../../utils/validators/user.schema.ts";


import { loginService } from "../../../service/loginservice.ts";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const body = await req.json(); // Parse the request body
        const parsed = LoginSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { errors: parsed.error.flatten().fieldErrors },
                { status: 400 } as any
            );
        }
        const { email, password } = parsed.data;
        const data = await loginService(email, password);        
        if(data instanceof NextResponse)
        {
            return data;
        }
        if(data)
        {   
                return NextResponse.json({ message: 'Login successful' ,data}, { status: 200 } as any);
        }
        return NextResponse.json({ message: 'Login failed' }, { status:400 } as any);

        // Compare the provided password with the stored hashed password

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 } as any);
    }
}