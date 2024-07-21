import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import next from "next";
import { NextRequest,NextResponse} from 'next/server'
import bcrypt from 'bcryptjs'
import { sendemail } from "@/helpers/mailer";

// for connecting signup route ot tha db
connect()  


export async function POST (request:NextRequest ) {
    
    try {
       const reqbody = await request.json()  //will be getting data
    const {username,email,password}  = reqbody

    // validation
    console.log(reqbody)


    const user = await User.findOne({email})
    if(user){
        return NextResponse.json({error:"User already exist"},{status:400})
    }

    // generatesalt for hasign password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt)

    const newUser = new User ({
        username:username,
        email:email,
        password:hashedPassword
    })

    const savedUser = await newUser.save()
    console.log(savedUser)

    // send verification email
    await sendemail({email,emailType:"VERIFY",userId : savedUser._id})

    return NextResponse.json({
        message:"user registered successfully",
        success:true,
        savedUser
    })


    } catch (error:any) {
        NextResponse.json({error: error.message},{status:500})
        
    }
}
