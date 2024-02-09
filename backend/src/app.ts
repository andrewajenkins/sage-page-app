// src/app.ts
import * as express from 'express';
import userRoutes from './userRoutes'; // Update the path as necessary
import connectDB from './database';

const app = express();

app.use(express.json());

connectDB();

// Use the userRoutes
app.use('/api', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app;
