import { useCalendarStore, useEventStore, useResponseStore } from '../store/store';
import { useEffect } from 'react';

const CourseBooking = () => {
  const selectedEventId = useCalendarStore((state) => state.selectedEventId);
  const events = useEventStore((state) => state.events);
  const selectedEvent = events.find((e) => e._id === selectedEventId);
  console.log('selectedEvent in courseBooking:', selectedEvent);

  const response = useResponseStore((state) => state.addBookingResponse);
  const setResponse = useResponseStore((state) => state.setAddBookingResponse);
  console.log('response in courseBooking:', response);

  async function addBooking() {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKENDURL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ event: selectedEventId }),
        credentials: 'include',
      });
      if (res.ok) {
        const response = await res.json();
        console.log('response:', response);
        setResponse(response);
        setTimeout(() => {
          setResponse(null);
          useCalendarStore.setState({ selectedEventId: null });
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!response) return;
    if (response.success === true) {
      setTimeout(() => {
        setResponse(null);
        useCalendarStore.setState({ selectedEventId: null });
      }, 3000);
    }
  }, [response]);

  return (
    <>
      {response ? (
        <p>{response.message}!</p>
      ) : (
        <>
          <h1>Kurs buchen</h1>
          <h2>{selectedEvent?.title}</h2>
          <p>{selectedEvent?.info}</p>
          <p>{selectedEvent?.date}</p>

          <button onClick={() => addBooking()} className='btn btn-accent'>
            Buchen
          </button>

          <button onClick={() => useCalendarStore.setState({ selectedEventId: null })} className='btn btn-warning'>
            Abbrechen
          </button>
        </>
      )}
    </>
  );
};

export default CourseBooking;
