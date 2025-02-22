// export const dynamic = "auto"  // by default 
// export const dynamic = "force-dynamic" // for reference: will behave like getServerProps, use server side without caching, always fetch latest data 
// = "force-static" - cache the page indefinitely - SSG like getStaticProps 
// export const revalidate = 6900 - ISR 


import { PrismaClient } from '@prisma/client'; 


import {NextRequest, NextResponse} from "next/server"
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        // const userData = JSON.parse(req.body)
        const {firstName,lastName, email, password} = reqBody
        console.log("Received signup data: ", reqBody)

        //  validation 
        // Validate input
        if (!firstName || !lastName || !email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }
        // const user = await User.findOne({email});
        const existingUser = await prisma.user.findFirst({
            where: { 
                OR: [{email}]
             }
        })
        if (existingUser) {
            return NextResponse.json({ error: "User already exist" }, { status: 400 });
        }
        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = await prisma.user.create({
            // data: userData
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword
            }
        })
        if (!newUser) {
            throw new Error("User creation failed");
        }
        console.log("User created:", newUser.email);


        return NextResponse.json({
            message: 'User created successfully', 
            success:true, 
        }, {status: 201})
    } catch (error: unknown) {
        // console.error("Signup Error: ", error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}