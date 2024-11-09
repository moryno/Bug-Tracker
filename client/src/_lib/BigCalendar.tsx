import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useCallback, useState } from 'react';
import { calendarType } from 'interfaces';

const localizer = momentLocalizer(moment)

const BigCalendar = ({ event, onSelectedEvent } : { event: calendarType[], onSelectedEvent: (event: calendarType) => void}) => {
    const [view, setView] = useState<View>(Views.WEEK);

    const calendarEvents = event?.map(event => ({
      id: event.id,
      title: event.title,
      startDate: new Date(event.startDate),
      endDate: new Date(event.endDate),     
    }));

    const handleOnChangeView = useCallback(( selectedView: View) => {
        setView(selectedView)
    }, []);

    const handleSelected =(e: any)=> {
      if(e){
        onSelectedEvent(e)
      }
    }
    return (
      <article style={{ flex: 1 }}>
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="startDate"
          onSelectEvent={handleSelected}
          endAccessor="endDate"
          views={["week", "day"]}
          view={view}
          onView={handleOnChangeView}
          style={{ height: "98%" }}
          // min={new Date(2025,1,0,8,0,0)}
          // max={new Date(2025,1,0,17,0,0)}
        />
        </article>
    )
}

export default BigCalendar