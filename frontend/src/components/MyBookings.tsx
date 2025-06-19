import { useEffect } from 'react';
import { useResponseStore, useEventStore } from '../store/store';
import Calendar from './Calendar';

const MyBookings = () => {
  const response = useResponseStore((state) => state.myBookingsResponse);
  const setResponse = useResponseStore((state) => state.setMyBookingsResponse);

  const events = useEventStore((state) => state.events);
  const setEvents = useEventStore((state) => state.setEvents);
  console.log('events in myBookings:', events);

  async function getMyBookings() {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKENDURL}/api/bookings/user`, {
        method: 'GET',
        credentials: 'include',
      });
      if (res.ok) {
        const response = await res.json();
        console.log('response:', response);
        setResponse(response);
        setEvents(response.data.bookings.map((booking: any) => booking.event));
        //! type für booking noch analog relevanter felder festlegen
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getMyBookings();
  }, []);

  return (
    <>
      <h1>Meine Buchungen</h1>
      <h2>Liste</h2>
      {response &&
        response.data.bookings.map((booking: any) => (
          <div key={booking._id} className='flex gap-5'>
            <p>{booking.event.className}</p>
            <p>{booking.event.title}</p>
            <p>{booking.event.date}</p>
          </div>
        ))}

      <h2>Kalender</h2>
      <Calendar events={events} />
    </>
  );
};

export default MyBookings;
