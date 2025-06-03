import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
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
});

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
