// src/app.ts
import * as express from 'express';
import userRoutes from './userRoutes'; // Update the path as necessary
import connectDB from './database';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

// Use the userRoutes
app.use('/api', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || '3000';
app.listen(parseInt(PORT), '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});