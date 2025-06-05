import { useRef, useState } from 'react';
import type { EventType } from '../frontend.types';
import { v4 as uuidv4 } from 'uuid';

const EventForm = () => {
  const [newEvent, setNewEvent] = useState<EventType | null>(null);
  const [recur, setRecur] = useState<boolean>(false);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  // const daysRefs = useRef<(HTMLInputElement | null)[]>([]);

  // console.log({ selectedDays });
  console.log({ newEvent });

  const titleRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);
  const startRecurRef = useRef<HTMLInputElement>(null);
  const endRecurRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const trainerRef = useRef<HTMLSelectElement>(null);
  const infoRef = useRef<HTMLTextAreaElement>(null);
  const classIdRef = useRef<HTMLInputElement>(null);
  const classNameRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);
  const recurRef = useRef<HTMLInputElement>(null);

  // console.log({ startTimeRef, endTimeRef, startRecurRef, endRecurRef });
  console.log({ recur });

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
    // const selectedDays = daysRefs.current
    //   .map((ref, index) => (ref?.checked ? index : null))
    //   .filter((n): n is number => n !== null);

    const newEvent: EventType = {
      title: titleRef.current?.value,
      recurring: recurRef.current?.checked,
      location: locationRef.current?.value,
      trainer: trainerRef.current?.value,
      info: infoRef.current?.value,
      classId: classIdRef.current?.value,
      className: classNameRef.current?.value,
      status: statusRef.current?.value,

      // einzelne events:
      date: !recur && dateRef.current?.value ? new Date(dateRef.current?.value).toISOString() : undefined,
      start:
        !recur && startRef.current?.value
          ? new Date(dateRef.current?.value + ' ' + startRef.current?.value).toISOString()
          : undefined,
      end:
        !recur && endRef.current?.value
          ? new Date(dateRef.current?.value + ' ' + endRef.current?.value).toISOString()
          : undefined,

      // recurring events:
      // daysOfWeek: recur ? selectedDays : [],
      daysOfWeek: recur ? selectedDays : [],
      startTime: recur && startTimeRef.current?.value ? startTimeRef.current?.value : undefined,
      endTime: recur && endTimeRef.current?.value ? endTimeRef.current?.value : undefined,
      startRecur:
        recur && startRecurRef.current?.value ? new Date(startRecurRef.current?.value).toISOString() : undefined,
      endRecur: recur && endRecurRef.current?.value ? new Date(endRecurRef.current?.value).toISOString() : undefined,
      groupId: recur ? uuidv4() : undefined,
    };
    // events werden in der db erst mal in utc time gespeichert!
    console.log({ newEvent });
    setNewEvent(newEvent);
    addEvent(newEvent);
  };

  const handleCheckboxChange = (day: number) => {
    setSelectedDays(
      (prev) =>
        prev.includes(day)
          ? prev.filter((d) => d !== day) // Tag raus löschen
          : [...prev, day] // hinzufügen
    );
  };

  return (
    <>
      <h1>Event From</h1>
      <section>
        <h2>Neues Event erstellen (Einzelevent)</h2>

        <article>
          <fieldset className='fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4'>
            <legend className='fieldset-legend'>Neues Event</legend>
            <div className='flex gap-2'>
              <label className='label'>Einzelevent</label>
              <input
                type='checkbox'
                ref={recurRef}
                onChange={(e) => setRecur(e.target.checked)}
                className='toggle border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800'
              />
              <label className='label'>Eventserie</label>
            </div>

            <label className='label'>Title</label>
            <input ref={titleRef} type='text' className='input' placeholder='Yoga am Abend' />

            {!recur ? (
              <>
                {/* //$ Inputs für Einzelevents */}
                <label className='label'>Datum</label>
                <input ref={dateRef} type='date' className='input' />

                <label className='label'>Start</label>
                <input ref={startRef} type='time' className='input' placeholder='start time' />

                <label className='label'>Ende</label>
                <input ref={endRef} type='time' className='input' placeholder='end time' />
              </>
            ) : (
              <>
                {/* //$ Inputs für Eventserien */}
                <legend className='fieldset-legend'>Wochentage</legend>
                <div className='flex gap-2'>
                  {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((label, index) => (
                    <div key={index} className='flex flex-col items-center'>
                      <label className='label'>{label}</label>
                      <input
                        type='checkbox'
                        className='checkbox checkbox-accent'
                        onChange={() => handleCheckboxChange(index)}
                        // ref={(el) => {
                        //   daysRefs.current[index] = el;
                        // }}
                        // hier ref benutzen anstatt onChange, weil man sonst noch einen state braucht der evtl. nicht aktuell ist?
                      />
                    </div>
                  ))}
                </div>

                <label className='label'>Start</label>
                <input ref={startTimeRef} type='time' className='input' />

                <label className='label'>Ende</label>
                <input ref={endTimeRef} type='time' className='input' />

                <label className='label'>Anfangsdatum</label>
                <input ref={startRecurRef} type='date' className='input' />

                <label className='label'>Enddatum</label>
                <input ref={endRecurRef} type='date' className='input' />
              </>
            )}

            {/* //$ allgemeine Inputs */}
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
