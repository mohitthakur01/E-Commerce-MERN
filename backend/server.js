import express from 'express';
import  dotenv  from 'dotenv';
import cors from 'cors'
import connectDB from './config/db.js'
import authRoutes from "./routes/authRoutes.js";


dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes )

connectDB()



app.get("/", (req, res)=> {
    res.send('hello')
})

app.listen(4000, ()=> {
    console.log('App is running On port 4000')
})

