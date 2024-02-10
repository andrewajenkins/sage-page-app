// src/routes/userRoutes.ts
import * as express from 'express';
import { User } from './models/User'; // Update the path as necessary
import { Subscription } from './models/Subscription'; // Update the path as necessary

const router = express.Router();

router.post('/newsletter/subscribe', async (req, res) => {
  try {
    console.log("oh hi der")
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({ message: 'Email is required' });
    }

    const newSubscription = new Subscription({ email });
    await newSubscription.save();

    res.status(201).send({ message: 'Subscription successful', data: newSubscription });
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error code
      return res.status(409).send({ message: 'This email is already subscribed.' });
    }
    console.error('Subscription error:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});
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
