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


export const createUser = async function createUser(email: string, password: string) {
  console.log(`Creating user with email: ${email}`);
  const user = await prisma.user.create({
    data: { name:"Godarshan",email:email, password:password },
  });
  console.log(`User created: ${JSON.stringify(user)}`);
  return user;
}
