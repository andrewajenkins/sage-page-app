// src/database.ts
import * as dotenv from 'dotenv';
const fs = require('fs');
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log("env:", JSON.stringify(process.env, null, 2));
        if (process.env.NODE_ENV == 'development') {
            console.log("dev!")
            dotenv.config()
            await mongoose.connect(process.env.DB_STRING, {user: process.env.DB_USER, pass: process.env.DB_PASSWORD});
        } else if (process.env.NODE_ENV == 'production') {
            console.log("pem path:", '/usr/src/app/global-bundle.pem');
            const ca = [fs.readFileSync('/usr/src/app/global-bundle.pem')];
            mongoose.set('debug', true);
            mongoose.connect(process.env.DB_STRING, {
              user: process.env.DB_USER,
              pass: process.env.DB_PASSWORD,
            })
            .then(() => console.log('Successfully connected to DB'))
            .catch((err) => console.error('Could not connect to DB', err));
        } else if (process.env.NODE_ENV == 'prod_dev') {
            console.log("prod local!");
            dotenv.config()
            await mongoose.connect(process.env.DB_STRING_PROD_LOCAL, {user: process.env.DB_USER, pass: process.env.DB_PASSWORD});
        }
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;
