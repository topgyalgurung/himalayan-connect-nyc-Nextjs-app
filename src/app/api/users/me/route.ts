
import { getDataFromToken } from '@/helpers/getDataFromToken';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
// import { GetServerSideProps } from 'next';

const prisma = new PrismaClient();

export async function GET(request:NextRequest){
    try {
        const userId = await getDataFromToken(request);
        console.log("Extracted userId: ", userId, typeof userId);
        const user = await prisma.user.findUnique({
            where:{id: Number(userId)},
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                // profilePicture: true,
                // exclude password
            }
        });
        console.log("Prisma query result: ", user); // Debugging
            
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 }); 
        }
        return NextResponse.json({
            message:"User found",
            data:user
        })
        
    } catch (error: unknown) {
        console.log("error extracting user")
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}