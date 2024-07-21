import mongoose from "mongoose";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse} from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const {email,password} = reqBody

        // validation
        console.log(reqBody)

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error:"User does not exist"},{status:400})
        }

        console.log("User exist")

        const validatePassword = bcrypt.compare(password,user.password)
        if(!validatePassword){
            return NextResponse.json({error:"Invalid Password"},{status:400})
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }

        const authtoken = jwt.sign(tokenData, process.env.TOKEN_SECRET!,{expiresIn:'1d'})

        const response = NextResponse.json({
            message:"User logged In successfully",
            success : true,
            authtoken:authtoken
        })

        response.cookies.set("token",authtoken,{
            httpOnly:true
        })

        return response


    } catch (error:any) {
        
        return NextResponse.json({error:"login failed"},{status:500})
    }
}