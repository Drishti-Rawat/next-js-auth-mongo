import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const GetDataFromToken = (request:NextRequest)=>{
    try {

       const authtoken= request.cookies.get("token")?.value || ""
       const decodedToken:any = jwt.verify(authtoken,process.env.TOKEN_SECRET!)

       return decodedToken.id
       
        
    } catch (error:any) {
        throw new Error(error.message)
        
    }
}