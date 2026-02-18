import express from 'express';
import  dotenv  from 'dotenv';
import cors from 'cors'
import connectDB from './config/db.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('APP is running')
})

connectDB()

app.listen(4000, ()=> {
    console.log('App is running On port 4000')
})
