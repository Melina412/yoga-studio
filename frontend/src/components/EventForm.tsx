import { useRef, useState } from 'react';
import type { EventType } from '../frontend.types';

const EventForm = () => {
  const [newEvent, setNewEvent] = useState<EventType | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const trainerRef = useRef<HTMLSelectElement>(null);
  const infoRef = useRef<HTMLTextAreaElement>(null);
  const classIdRef = useRef<HTMLInputElement>(null);
  const classNameRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);

  async function addEvent(event: EventType) {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKENDURL}/api/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
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

  const handleClick = () => {
    console.log('clicked');

    const newEvent: EventType = {
      title: titleRef.current?.value,
      date: new Date(dateRef.current?.value || '').toISOString(),
      start: new Date(dateRef.current?.value + ' ' + startTimeRef.current?.value || '').toISOString(),
      end: new Date(dateRef.current?.value + ' ' + endTimeRef.current?.value || '').toISOString(),
      location: locationRef.current?.value,
      trainer: trainerRef.current?.value,
      info: infoRef.current?.value,
      classId: classIdRef.current?.value,
      className: classNameRef.current?.value,
      status: statusRef.current?.value,
    };
    // events werden in der db erst mal in utc time gespeichert!
    console.log({ newEvent });
    setNewEvent(newEvent);
    addEvent(newEvent);
  };

  return (
    <>
      <h1>Event From</h1>
      <section>
        <h2>Neues Event erstellen (Einzelevent)</h2>

        <article>
          <fieldset className='fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4'>
            <legend className='fieldset-legend'>Neues Event</legend>

            <label className='label'>Title</label>
            <input ref={titleRef} type='text' className='input' placeholder='Yoga am Abend' />

            <label className='label'>Datum</label>
            <input ref={dateRef} type='date' className='input' />

            <label className='label'>Start</label>
            <input ref={startTimeRef} type='time' className='input' placeholder='start time' />

            <label className='label'>Ende</label>
            <input ref={endTimeRef} type='time' className='input' placeholder='end time' />

            <label className='label'>Location</label>
            <input ref={locationRef} type='text' className='input' placeholder='location' />

            <label className='label'>Trainer:in</label>
            <select ref={trainerRef} defaultValue='Trainer:in auswählen' className='select'>
              <option disabled={true}>Trainer:in auswählen</option>
              <option>Mitarbeiter:in 1</option>
              <option>Mitarbeiter:in 2</option>
            </select>

            <label className='label'>Info</label>
            <textarea ref={infoRef} className='textarea' placeholder='Infotext'></textarea>

            <label className='label'>Kurs-ID</label>
            <input ref={classIdRef} type='text' className='input' placeholder='Y-123' />

            <label className='label'>Eventitem-Style</label>
            <input ref={classNameRef} type='text' className='input' placeholder='yoga, pilates, mediatation...' />

            <label className='label'>Status</label>
            <select ref={statusRef} defaultValue='Status auswählen' className='select'>
              <option disabled={true}>Status auswählen</option>
              <option value={'upcoming'}>bevorstehend</option>
              <option value={'ongoing'}>laufend</option>
            </select>

            <div className='modal-action'>
              <button className='btn btn-outline' onClick={() => handleClick()}>
                Erstellen
              </button>
            </div>
          </fieldset>
        </article>
      </section>
    </>
  );
};

export default EventForm;
