import { NextResponse } from "next/server";
import { createUser, findUserByEmail } from "../Repository/userrepo.ts";
// import { hashPassword } from "../../../lib/auth.ts";
import { hashPassword } from "../../lib/auth.ts";


export async function signupService(email:string,password:string)
{
    const user=await findUserByEmail(email);    
    if(user)
    {
        return NextResponse.json({ message: 'User already exists' }, { status: 400 }as any);
    }    
    const hashedPassword=await hashPassword(password);
    const data=await createUser(email,hashedPassword);
    return data;        
}