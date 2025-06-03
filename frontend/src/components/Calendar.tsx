import { useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import deLocale from '@fullcalendar/core/locales/de';
import EventModal from './EventModal';

import { useCalendarStore, useEventStore } from '../store/store';

import '../style/calendar.css';

const Calendar = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const setEvents = useEventStore((state) => state.setEvents);
  const events = useEventStore((state) => state.events);
  const setSelectedEventId = useCalendarStore((state) => state.setSelectedEventId);

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

  const handleEventClick = (info: any) => {
    info.jsEvent.preventDefault(); // verhindert default click behavior ( link öffnen??)
    // console.log('info:', info);

    //? id aus FullCalendar Event war plötzlich leer ?!
    setSelectedEventId(info.event.extendedProps._id);
    dialogRef.current?.showModal();
  };

  return (
    <>
      <section className='calendar m-10'>
        <h1>Calendar</h1>
        <div className='fc-custom'>
          {/* <h2 className='text-2xl bg-red-500'>ÜBERSCHRIFT</h2> */}
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            locale={deLocale}
            initialView='timeGridWeek'
            events={events}
            eventClick={handleEventClick}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'timeGridDay,timeGridWeek,dayGridMonth',
            }}
            // das ist bei locale de automatisch angepasst, aber so könnte man es ändern:
            // titleFormat={{
            //   month: 'long',
            //   day: 'numeric',
            //   year: 'numeric',
            // }}
            // slotLabelFormat={{
            //   hour: 'numeric',
            //   minute: 'numeric',
            //   hour12: false,
            // }}
            // eventTimeFormat={{
            //   hour: '2-digit',
            //   minute: '2-digit',
            //   hour12: false,
            // }}
          />
        </div>
        <EventModal ref={dialogRef} />
      </section>
    </>
  );
};

export default Calendar;
