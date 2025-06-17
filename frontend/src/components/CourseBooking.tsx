import { useCalendarStore, useEventStore } from '../store/store';

const CourseBooking = () => {
  const selectedEventId = useCalendarStore((state) => state.selectedEventId);
  const events = useEventStore((state) => state.events);
  const selectedEvent = events.find((e) => e._id === selectedEventId);
  console.log('selectedEvent in courseBooking:', selectedEvent);

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
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1>Kurs buchen</h1>
      <h2>{selectedEvent?.title}</h2>
      <p>{selectedEvent?.info}</p>
      <p>{selectedEvent?.date}</p>
      <button onClick={() => addBooking()} className='btn btn-accent'>
        Buchen
      </button>
    </>
  );
};

export default CourseBooking;
