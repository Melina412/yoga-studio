import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
  role: {
    type: String,
    required: [true, 'User role is required!'],
    enum: ['Admin', 'Staff', 'Customer'],
    default: 'Customer',
  },
  displayName: {
    type: String,
  },
});

export const User = mongoose.model('user', userSchema);
