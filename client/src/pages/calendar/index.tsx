import { BigCalendar, ContainerButton } from "_lib"
import { calendarType, IEvent } from "interfaces";
import { useCallback, useState } from "react";
import { FaPlus } from "react-icons/fa"
import SchedulerForm from "./components/SchedulerForm";
import { StyledCalendarButtonWrapper, StyledCalendarContainer } from "./index.styled";
import { useAuthUser, useGetById } from "_hooks";
import { EventService } from "_services";
import { DomianEnum } from "_constants";

const CalendarPage = () => {
  const { user } = useAuthUser();
  const { isLoading , data: eventData, refetch } = useGetById(EventService.getCalendarEvent, DomianEnum.EVENT, user?.userName);
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<IEvent| null>(null);
  const [statusMode, setStatusMode] = useState("CreateMode");
  const [showDetails, setShowDetails] = useState(false);

  const showDrawer = useCallback(() => {
    setOpen(true);
  }, []);
  const refetchEvent = useCallback(() => {
    refetch()
  }, [refetch])
const onSelectedEvent = async (event: calendarType) => {
  try {
    const { data } = await EventService.getEventDetails(event.id!);
    setSelectedRecord(data);
    setStatusMode("EditMode");
    setShowDetails(true);
    showDrawer();
  } catch (error) {
    console.log(error);
    setOpen(false);
    setStatusMode("CreateMode");
  }
}
  const onClose = useCallback(() => {
    setOpen(false);
    setSelectedRecord(null);
    setStatusMode("CreateMode")
  }, []);

  if(isLoading) return <p>Loading...</p>

  return (
    <StyledCalendarContainer>
      <StyledCalendarButtonWrapper>
      <ContainerButton
            title={`Schedule Event`}
            size="middle"
            icon={<FaPlus size={16} /> }
            onClick={showDrawer}
            type="primary"
           />
      </StyledCalendarButtonWrapper>
      <BigCalendar event={eventData?.data} onSelectedEvent={onSelectedEvent} />
      {open &&
          <SchedulerForm  
            key={statusMode && selectedRecord?.id}
            open={open} 
            refetchEvent={refetchEvent}
            onClose={onClose} 
            showDetails={showDetails}
            editedRecord={selectedRecord} 
            statusMode={statusMode}
           />
         }
    </StyledCalendarContainer>
  )
}

export default CalendarPage