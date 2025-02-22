import { PrismaClient } from '@prisma/client'; 
import {NextRequest, NextResponse} from "next/server"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// export const runtime = "edge"; 

const prisma = new PrismaClient(); 

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody 

        const user = await prisma.user.findFirst({
            where: { 
                OR: [{email}]
             }
        });
        if (!user) {
            return NextResponse.json({error:"User does not exist"}, {status:400}) 
         }
         // check if password is correct
         const validPassword = await bcryptjs.compare(password, user.password)
         if (!validPassword) {
            return NextResponse.json({error:'Invalid password'},{status:400})
         }
         //create token data
         const tokenData = {
            id: user.id,
            // username: user.username,
            email: user.email
         }
         // create token
         const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {expiresIn:"1d"})

         // set user cookie 
         const response = NextResponse.json({message:"Login successful", success:true})
         response.cookies.set("token", token, {httpOnly:true})
         return response;
        
        } catch (error: unknown) {
            return NextResponse.json({ error: (error as Error).message }, { status: 500 });
        }
    
}