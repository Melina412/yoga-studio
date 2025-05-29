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
  const setSelectedEventId = useCalendarStore((state) => state.setSelectedEventId);

  const handleEventClick = (info: any) => {
    info.jsEvent.preventDefault(); // verhindert default click behavior ( link öffnen??)
    setSelectedEventId(info.event.id);
    dialogRef.current?.showModal();
  };

  const eventData = [
    {
      id: '0',
      title: 'event 0',
      date: '2025-05-19',
      start: '2025-05-19T11:00:00',
      end: '2025-05-19T13:00:00',
      className: 'yoga',
      info: 'this is a yoga class',
    },
    {
      id: '1',
      title: 'event 1',
      date: '2025-05-22',
      start: '2025-05-22T10:00:00',
      end: '2025-05-22T12:00:00',
      className: 'pilates',
      info: 'this is a pilates class',
    },
    {
      id: '2',
      title: 'event 2',
      date: '2025-05-23',
      start: '2025-05-23T10:00:00',
      end: '2025-05-23T12:00:00',
      className: 'pilates',
      info: 'this is a pilates class',
    },
    {
      id: '3',
      title: 'event 3',
      date: '2025-05-24',
      start: '2025-05-23T13:00:00',
      end: '2025-05-23T16:00:00',
      className: 'meditation',
      info: 'this is a meditation class',
    },
    {
      id: '4',
      title: 'event 4',
      date: '2025-05-26',
      start: '2025-05-26T11:00:00',
      end: '2025-05-26T13:00:00',
      className: 'yoga',
      info: 'this is a yoga class',
    },
    {
      id: '5',
      title: 'event 5',
      date: '2025-05-29',
      start: '2025-05-29T10:00:00',
      end: '2025-05-29T12:00:00',
      className: 'pilates',
      info: 'this is a pilates class',
    },
  ];

  useEffect(() => {
    // state darf nicht direkt in der komponente gesetzt werden
    setEvents(eventData);
  }, []);
  const events = useEventStore((state) => state.events);

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
