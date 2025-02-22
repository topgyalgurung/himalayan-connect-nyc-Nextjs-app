import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const { token } = reqBody
        console.log(token);

        // find user based on token 
        // if token expiry in future we can verify, if expired we cannot 
       const user = await  User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        })

        if (!user) {
            return NextResponse.json({ error: "Invalid token or user not found" },
                {status:400}
            )
        }
        console.log(user);
        // now update db isVerified field and flush verifyToken and expiry
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })
        
    } catch (error: unknown) {
        if (error instanceof Error) {
          return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
          // If it's not an instance of Error, handle the unknown error case
          return NextResponse.json({ error: 'An unknown error occurred.' }, { status: 500 });
        }
      }
}