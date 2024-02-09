// src/models/User.ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

export const User = mongoose.model('User', userSchema);
