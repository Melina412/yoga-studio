import { useEffect } from 'react';
import { useEventStore } from '../store/store';
import Calendar from './Calendar';

const AllCourses = () => {
  const events = useEventStore((state) => state.events);
  const setEvents = useEventStore((state) => state.setEvents);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKENDURL}/api/events`, {
          method: 'GET',
        });
        if (res.ok) {
          const response = await res.json();
          console.log('response:', response);
          setEvents(response.data.events);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchEvents();
  }, []);
  return <Calendar events={events} />;
};

export default AllCourses;
