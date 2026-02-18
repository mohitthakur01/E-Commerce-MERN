import mongoose from 'mongoose'

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Mongo DB connect successfully ')
    }catch(error){
        console.log(`Error : ${error}`);
        }
    }

    export default connectDB;