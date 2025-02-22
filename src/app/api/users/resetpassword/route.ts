import { connect } from "@/dbConfig/dbConfig";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect()

// verify token and save new password after encrypting it 
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token, password } = reqBody;
        console.log("Token received: ", token);
        
        if (!token || !password) {
            return NextResponse.json({ error: "Token and password are required." }, { status: 400 });
        }

        // validate token and find the user
        const user = await prisma.user.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() },
        });
             // Check if token is not expired);
        if (!user || user.forgotPasswordTokenExpiry < Date.now()) {
            return NextResponse.json({ error: "Invalid or expired token." }, { status: 400 });
        }

        //encrypt or hash the password 
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // clear reset token and expiry  
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined
        await user.save();

        return NextResponse.json({
            message: "Password reset successful",
            success:true
        })

    } catch (error: unknown) {
        if (error instanceof Error) {
          // Safely access the error message if it's an instance of Error
          console.error("Password reset error:", error);
          return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
          // If it's not an instance of Error, handle the unknown error case
          console.error("An unknown error occurred during password reset.");
          return NextResponse.json({ error: 'An unknown error occurred.' }, { status: 500 });
        }
      }
}
