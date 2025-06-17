import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  start: {
    type: String,
  },
  end: {
    type: String,
  },
  location: {
    type: String,
  },
  trainer: {
    type: String,
  },
  info: {
    type: String,
  },
  classId: {
    type: String,
  },
  className: {
    type: String,
    required: [true, 'className is required!'],
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'archived', 'cancelled'],
    default: 'upcoming',
  },
  recurring: {
    type: Boolean,
  },
  groupId: {
    type: String,
  },
  groupInfo: {
    daysOfWeek: {
      type: [Number],
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    startRecur: {
      type: String,
    },
    endRecur: {
      type: String,
    },
    eventBookings: {
      maxNumber: {
        type: Number,
      },
      bookings: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Booking',
        },
      ],
    },
  },
});
//! hier noch irgendwie validieren, dass man bei recurring true/false jeweils start bzw. startTime usw. braucht

export const Event = mongoose.model('Event', eventSchema);

//  {
//       id: '0',
//       title: 'event 0',
//       date: '2025-05-19',
//       start: '2025-05-19T11:00:00',
//       end: '2025-05-19T13:00:00',
//       className: 'yoga',
//       info: 'this is a yoga class',
//     },
