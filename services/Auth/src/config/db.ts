import mongoose, { connect } from 'mongoose'

const connectDB= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI as string,{
            dbName: 'Zwigato'
        });

        console.log('connected to mongodb');
        
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;
