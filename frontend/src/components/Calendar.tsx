import { useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import deLocale from '@fullcalendar/core/locales/de';
import EventModal from './EventModal';

import '../style/calendar.css';

const Calendar = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleEventClick = (info: any) => {
    info.jsEvent.preventDefault(); // verhindert default click behavior ( link öffnen??)
    dialogRef.current?.showModal();
  };
  return (
    <>
      <section className='calendar m-10'>
        <h1>Calendar</h1>
        <div className='fc-custom'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            locale={deLocale}
            initialView='timeGridWeek'
            events={[
              {
                title: 'event 0',
                date: '2025-05-19',
                start: '2025-05-19T11:00:00',
                end: '2025-05-19T13:00:00',
                className: 'yoga',
              },
              {
                title: 'event 1',
                date: '2025-05-22',
                start: '2025-05-22T10:00:00',
                end: '2025-05-22T12:00:00',
                className: 'pilates',
              },
              {
                title: 'event 2',
                date: '2025-05-23',
                start: '2025-05-23T10:00:00',
                end: '2025-05-23T12:00:00',
                className: 'pilates',
              },
              {
                title: 'event 3',
                date: '2025-05-24',
                start: '2025-05-23T13:00:00',
                end: '2025-05-23T16:00:00',
                className: 'meditation',
              },
            ]}
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
