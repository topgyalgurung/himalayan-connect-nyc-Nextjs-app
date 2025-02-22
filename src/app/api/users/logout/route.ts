import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message:"Logout successful",
            success:true,
        })
        response.cookies.set("token", "",{httpOnly:true, expires:new Date(0)})// expires is optional just httpOnly true will do 
        return response;
    } catch (error:unknown) { // instead of any use unknown as it forces type checking
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}