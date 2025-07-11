import CourseBooking from '../../components/CourseBooking';
import MyBookings from '../../components/MyBookings';
import { useEventStore } from '../../store/store';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {
  const selectedEventId = useEventStore((state) => state.selectedEventId);
  console.log('selectedEventId im Dashboard:', selectedEventId);

  const navigate = useNavigate();

  // const events = useEventStore((state) => state.events);
  // const selectedEvent = events.find((e) => e._id === selectedEventId);

  return (
    <>
      <h1 className='text-2xl text-center m-auto my-10'>Customer Dashboard</h1>
      <section>
        {!selectedEventId ? (
          <button onClick={() => navigate('/timetable')} className='btn btn-secondary'>
            Zur Kursübersicht
          </button>
        ) : (
          <CourseBooking />
        )}
        {/* {response && <p>{response.message}!</p>} */}
      </section>
      <section>
        <MyBookings />
      </section>
    </>
  );
};

export default CustomerDashboard;
