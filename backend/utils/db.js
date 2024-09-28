import mongoose from "mongoose";

const DBCon=async()=>{
    try {
          mongoose.connect(process.env.MONG0DB_URL)
          console.log('MONGODB IS CONNECTED')
    } catch (error) {
        console.log('MongoDB error',error)
    }
}

export default DBCon