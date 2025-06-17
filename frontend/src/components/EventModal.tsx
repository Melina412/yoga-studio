import { forwardRef } from 'react';
import { useCalendarStore, useEventStore } from '../store/store';
import { useNavigate } from 'react-router-dom';

const EventModal = forwardRef<HTMLDialogElement>((_, dialogRef) => {
  const selectedEventId = useCalendarStore((state) => state.selectedEventId);
  const setSelectedEventId = useCalendarStore((state) => state.setSelectedEventId);
  const events = useEventStore((state) => state.events);
  const selectedEvent = events.find((e) => e._id === selectedEventId);

  const navigate = useNavigate();

  console.log('events in modal:', events);
  console.log('selectedEvent in modal:', selectedEvent);

  console.log('selectedEventId im modal:', selectedEventId);

  return (
    <>
      {/* useRef parameter mit forwardRef an Kind-Element weitergeben, um Modal mit dialogRef.current?.showModal() öffnen zu können */}
      <dialog ref={dialogRef} id='eventModal' className='modal'>
        <div className='modal-box'>
          <form method='dialog'>
            <button
              onClick={() => setSelectedEventId(null)}
              className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
          </form>

          <h3 className='font-bold text-lg'>{selectedEvent?.title}</h3>
          <p className='py-4'>{selectedEvent?.info}</p>
          <div>
            <button onClick={() => navigate('/dashboard')} className='btn btn-primary'>
              Diesen Kurs buchen
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
});

export default EventModal;
