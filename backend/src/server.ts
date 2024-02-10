// src/app.ts
import * as express from 'express';
import userRoutes from './userRoutes'; // Update the path as necessary
import connectDB from './database';
import * as dotenv from 'dotenv';

console.log("NODE_ENV:", process.env.NODE_ENV)
// Only load dotenv if not in production
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();

app.use(express.json());

connectDB();

// Use the userRoutes
app.use('/api', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || '4200';
app.listen(parseInt(PORT), '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});