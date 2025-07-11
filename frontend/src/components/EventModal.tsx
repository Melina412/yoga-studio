import { forwardRef } from 'react';
import { useEventStore } from '../store/store';
import { useNavigate } from 'react-router-dom';

const EventModal = forwardRef<HTMLDialogElement>((_, dialogRef) => {
  const selectedEventId = useEventStore((state) => state.selectedEventId);
  const setSelectedEventId = useEventStore((state) => state.setSelectedEventId);
  const events = useEventStore((state) => state.events);
  // const selectedEvent = useEventStore.getState().selectedEvent();
  const selectedEvent = events.find((e) => e._id === selectedEventId) || null;

  const navigate = useNavigate();

  // console.log('events in modal:', events);
  console.log('selectedEvent in modal:', selectedEvent);

  console.log('selectedEventId im modal:', selectedEventId);

  const handleButtonClick = () => {
    setSelectedEventId(selectedEventId);
    navigate('/dashboard');
  };

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
            <button onClick={handleButtonClick} className='btn btn-primary'>
              Diesen Kurs buchen
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
});

export default EventModal;
