import { forwardRef } from 'react';

const EventModal = forwardRef<HTMLDialogElement>((_, dialogRef) => {
  return (
    <>
      {/* useRef parameter mit forwardRef an Kind-Element weitergeben, um Modal mit dialogRef.current?.showModal() öffnen zu können */}
      <dialog ref={dialogRef} id='eventModal' className='modal'>
        <div className='modal-box'>
          <form method='dialog'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
          </form>
          <h3 className='font-bold text-lg'>Hi!</h3>
          <p className='py-4'>ich bin das Modal lol</p>
        </div>
      </dialog>
    </>
  );
});

export default EventModal;
