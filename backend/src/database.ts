// src/database.ts
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_STRING, { user: 'devuser', pass:'devpass'});
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;
