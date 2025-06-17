import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // ref brauche ich nicht, userdaten werden hier vorerst nicht benötigt
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  paymentStatus: {
    type: String,
  },
  bookingStatus: {
    type: String,
    default: 'pending',
  },
});

export const Booking = mongoose.model('Booking', bookingSchema);

/*
export type Booking = mongoose.Document & {
    event: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    paymentStatus: string;
    bookingStatus: string;
};
*/
