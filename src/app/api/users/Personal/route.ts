import mongoose from "mongoose";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse} from 'next/server'
import { GetDataFromToken } from "@/helpers/GetDataFromToken";

connect()

export async function POST(request:NextRequest){
    // extract data from token
    try {
        const userId = await GetDataFromToken(request)
    const user = await User.findById({_id : userId}).select("-password")
    // check if there is no user

    if(!user){
        NextResponse.json({error:"invalid token"},{status:400})
    }

    console.log(user)

    return NextResponse.json({
        message:"user found",
        data:user
    })
    } catch (error) {
        NextResponse.json({
            error:"user noe found",
            success:"false"
        })
    }
    

}