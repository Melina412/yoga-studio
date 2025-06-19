import { useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import deLocale from '@fullcalendar/core/locales/de';
import EventModal from './EventModal';

import { useCalendarStore } from '../store/store';

import '../style/calendar.css';

const Calendar = ({ events }: any) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const setSelectedEventId = useCalendarStore((state) => state.setSelectedEventId);

  const handleEventClick = (info: any) => {
    info.jsEvent.preventDefault(); // verhindert default click behavior ( link öffnen??)
    // console.log('info:', info);
    setSelectedEventId(info.event.extendedProps._id);
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
