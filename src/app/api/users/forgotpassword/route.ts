import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma";
import { sendEmail } from "@/helpers/mailer";

connect()

// backend generates a token, stores in db and sends email with token using nodemailer 
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email } = reqBody
        console.log(email);
        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // create validation if user exists
        const user = await prisma.user.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "Account with this email does not exist." }, { status: 404 });
        }
        // If yes, use nodemailer to send token to the email and 
        // also send the token to the database

         // helper function sendEmail handles creating token and updating db
         await sendEmail({
            email,
            emailType: "RESET",
            userId: user._id
        })
        
        return NextResponse.json({
            message: "Check your email for reset password",
            success: true,
            user
        })
        
    } catch (error: unknown) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}