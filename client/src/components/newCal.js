import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import React from 'react';

const NewCal = (props) => {
  const eventString = 'calender' + props.id;

  const eventArray = JSON.parse(localStorage.getItem(eventString));

  let x;

  if (eventArray) {
    x = eventArray.filter((element, index) => {
      return index % 2 === 0;
    });
  } else {
    x = eventArray;
  }

  console.log(x);

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        events={x}
        initialView="dayGridMonth"
        eventClick={(info) =>
          alert(
            'Title: ' +
              info.event.title +
              '\nDescription: ' +
              info.event.extendedProps.description
          )
        }
      />
    </>
  );
};

export default NewCal;
