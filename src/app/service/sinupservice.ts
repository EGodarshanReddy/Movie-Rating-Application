import { NextResponse } from "next/server";
import { createUser, findUserByEmail } from "../Repository/userrepo";
import { hashPassword } from "@shared/lib/auth";



export async function signupService(name:string,email:string,password:string)
{
    const user=await findUserByEmail(email);    
    if(user)
    {
        return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }    
    const hashedPassword=await hashPassword(password);
    const data=await createUser(name,email,hashedPassword);
    return data;        
}