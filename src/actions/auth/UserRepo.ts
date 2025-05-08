import {PrismaClient, Review } from "@prisma/client";

const prisma= new PrismaClient();
export const findUserByEmail=(email:string)=>{    
    return prisma.user.findUnique({where:{email}}); 
}

// deno-lint-ignore require-await
export const createUser=(email:string,password:string)=>{
    return prisma.user.create({data:{name:"Godarshan",email:email,password:password,role:"USER"}}); 
}