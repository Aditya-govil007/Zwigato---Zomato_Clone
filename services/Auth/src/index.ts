import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import connectDB from './config/db.js'
import authRoute from './routes/Auth.js'
import cors from 'cors'


const app=express()
app.use(cors())
app.use(express.json());

app.use("/api/auth",authRoute)


const PORT= process.env.PORT || 5000


app.listen(PORT,()=>{
    console.log(`AUTH SEVICE IS RUNNING ON PORT${PORT}`);
    connectDB()

    
});