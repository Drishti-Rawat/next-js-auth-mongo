import mongoose from "mongoose";

export  async function connect() {
 
    try {

        mongoose.connect(process.env.MONGO_URL!) // used ! to remove the error ! its showinf string will come surely

        const connection = mongoose.connection
        
        connection.on('connected',()=>{
            console.log("Mongo db connected")
        })

        connection.on("error",(err)=>{
            console.log("mongo db connection error, please make sure db is up and running"+ err)
            process.exit()
        })

        
    } catch (error) {
        console.log("something went wrong in connecting to DB")
        console.log(error)
    }
}