import { useEffect } from 'react';
import { useResponseStore } from '../store/store';

const MyBookings = () => {
  const response = useResponseStore((state) => state.myBookingsResponse);
  const setResponse = useResponseStore((state) => state.setMyBookingsResponse);
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
      {response &&
        response.data.bookings.map((booking: any) => (
          <div className='flex gap-5'>
            <p>{booking.event.className}</p>
            <p>{booking.event.title}</p>
            <p>{booking.event.date}</p>
          </div>
        ))}
    </>
  );
};

export default MyBookings;
