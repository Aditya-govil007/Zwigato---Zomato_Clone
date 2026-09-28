import express from "express";
import connectDB from "./config/db.js";
import dotenv from 'dotenv';
import restaurantRoutes from "./routes/Restaurant.js"
import cors from "cors"
import itemRoutes from './routes/menuitem.js'

dotenv.config()

const app= express()

app.use(cors());

app.use(express.json())

const PORT= process.env.PORT || 5001

app.use("/api/restaurant", restaurantRoutes)
app.use("/api/item", itemRoutes)


app.listen(PORT,()=>{
    console.log(`RESTAURANT SEVICE IS RUNNING ON PORT${PORT}`);
    connectDB()

    
});