import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface DecodedToken{
    id: string;
}

export const getDataFromToken = (request:NextRequest) =>{
    try {
        const token = request.cookies.get('token')?.value || '';  // encoded token
        // extract response of function
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedToken;         // any for now, not good idea, but change
        console.log("Decoded Token ID:", decodedToken.id);
        return decodedToken.id;     // from api/users/login/route.ts 
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred while verifying the token");  
    }
}