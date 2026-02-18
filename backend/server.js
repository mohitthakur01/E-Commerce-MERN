import express from 'express';
import  dotenv  from 'dotenv';
import cors from 'cors'
import connectDB from './config/db.js'
import { signupUser } from "./controllers/authController.js";

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', signupUser)

connectDB()

app.listen(4000, ()=> {
    console.log('App is running On port 4000')
})

