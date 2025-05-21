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
    enum: ['admin', 'staff', 'customer'],
    default: 'customer',
  },
  displayName: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  contactInfo: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: [
      {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
    ],
  },
  subscription: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
});

export const User = mongoose.model('user', userSchema);

/*

const user = {
  email: string,
  password: string,
  salt: string,
  role: string,
  displayName: string,
  verified: boolean,
  contactInfo: {
    firstName: string,
    lastName: string,
    phone: string,
    address: [{
      type: string,
      default: boolean,
      data: {
        name: string;
        street: string,
        street2: string,
        postCode: number,
        city: string,
        state: string,
        country: string,        
      },
    }],
  },
  subscription: {},
  
}

  */
