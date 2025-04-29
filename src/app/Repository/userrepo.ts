// import prisma from "../../lib/prisma.ts";

import  {PrismaClient}  from "@prisma/client";
const prisma= new PrismaClient();




// deno-lint-ignore require-await
export const findUserByEmail=async(email:string)=>{
    console.log(`Finding user by email: ${email}`);
    const user = await prisma.user.findUnique({where:{email}});
    console.log(`User: ${JSON.stringify(user)}`);
    return user;
}


export const createUser = async function createUser(name:string,email: string, password: string) {
  console.log(`Creating user with email: ${email}`);
  const user = await prisma.user.create({
    data: { name:name,email:email, password:password },
  });
  console.log(`User created: ${JSON.stringify(user)}`);
  return user;
}
export async function isUserExists(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true }
  });

  return !!user; // returns true if user exists, false if not
}