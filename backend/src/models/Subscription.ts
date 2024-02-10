const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'], // This regex is a basic example; adjust as needed for your use case
  },
  dateSubscribed: {
    type: Date,
    default: Date.now,
  },
  // Add other fields as necessary
});

export const Subscription = mongoose.model('Subscription', subscriptionSchema);
