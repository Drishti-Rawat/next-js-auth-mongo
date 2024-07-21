import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type:String,
        required:[true,"Please provide a username"],
        unique : [true,"username already exist"]
    },
    email:{
        type:String,
        required:[true,"Pleae provide an Email"],
        unique:[true,"Email already exist"]
    },
    password:{
        type:String,
        required:[true,"Please enter a password"]
    },
    isVerified : {
        type:Boolean,
        default:false
    },
    isAdmin : {
        type:Boolean,
        default:false
    },
    date : {
        type:Date,
        default:Date.now
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken : String,
    verifyTokenExpirey : Date
})

const User = mongoose.models.users || mongoose.model("users",userSchema)

export default User