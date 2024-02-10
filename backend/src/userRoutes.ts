// src/routes/userRoutes.ts
import * as express from 'express';
import { User } from './models/User'; // Update the path as necessary

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add more routes as needed...

export default router;
