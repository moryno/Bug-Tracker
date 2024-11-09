import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { message, Space, Spin, Tabs, TabsProps } from "antd";
import {
  StyledEventCalendarRange,
  StyledEventCloseIcon,
  StyledEventDeleteIcon,
  StyledEventDetailContainer,
  StyledEventDetailHeader,
  StyledEventDetailInfoWrapper,
  StyledEventDetailLeftWrapper,
  StyledEventDetailRightWrapper,
  StyledEventEditIcon,
  StyledEventText,
  StyledEventTitle,
} from "./index.styled";
import { AppComment } from "_lib";
import { commentType, IEvent } from "interfaces";
import { EventService } from "_services";
import { DomianEnum, PROJECT_ROUTE } from "_constants";
import moment from "moment";
import EventCalendar from "./EventCalendar";
import { AxiosResponse } from "axios";

const Spinner = () => {
  const contentStyle: React.CSSProperties = {
    padding: 50,
    background: '#12CC1B',
    borderRadius: 4,
  };
  
const content = <div style={contentStyle} />;

return <Spin tip="Loading">{content}</Spin>
};

interface IProps {
  event: IEvent;
  onClear: () => void;
  refetchEvent: () => void;
  onUpdate: (event: IEvent) => void;
}
const queryString = `${DomianEnum.EVENT}-comments`;

const EventDetail: React.FC<IProps> = ({ event, onClear, onUpdate, refetchEvent }) => {
  const { getEventComments, createEventComment, deleteEventComment, deleteEvent } = EventService;
  const [isDeleting, setIsDeleting] = useState(false);

const handleDelete = useCallback(async () => {
  if(!event) return message.warning("No event to delete.");

  setIsDeleting(true);
  try {
    await deleteEvent(event.id!);
    setIsDeleting(false);
    onClear()
    refetchEvent()
  } catch (error) {
    setIsDeleting(false);
    console.log(error)
  }
}, [deleteEvent, event, onClear, refetchEvent])

  const items: TabsProps["items"] = useMemo(
    () => [
      {
        key: "1",
        label: "Comments",
        children: (
          <AppComment 
            parentId={event.id!}
            parentIdIdentifier={"eventId"}
            getService={getEventComments}
            deleteService={deleteEventComment}
            queryString={queryString}
            createService={createEventComment} 
            editService={function (comment: commentType): Promise<AxiosResponse<any, any>> {
              throw new Error("Function not implemented.");
            } }   
           />
        ),
      }
    ],
    [createEventComment, deleteEventComment, event.id, getEventComments]
  );


  return (
    <StyledEventDetailContainer>
      <StyledEventDetailHeader>
        <StyledEventDetailLeftWrapper>
           <EventCalendar startDate={event.startDate} endDate={event.endDate} />
          <StyledEventDetailInfoWrapper>
            <StyledEventTitle>{event.title}</StyledEventTitle>
            <StyledEventText>
              {event.location || "Virtual"} @ <StyledEventCalendarRange>{moment(event.startDate).format("MM-DD-YYYY hh:mmA")} To {moment(event.endDate).format("MM-DD-YYYY hh:mmA")} </StyledEventCalendarRange>
            </StyledEventText>
            <StyledEventText>
              Project: <Link to={`${PROJECT_ROUTE}/${event.projectId}`}>Vacation</Link>
            </StyledEventText>
            <StyledEventText>Attendees: <StyledEventCalendarRange>{event.attendees!.map(attendee => attendee.fullName).join(", ")} </StyledEventCalendarRange></StyledEventText>
          </StyledEventDetailInfoWrapper>
        </StyledEventDetailLeftWrapper>
        <StyledEventDetailRightWrapper>
          {isDeleting ?
          <Spinner />
          :
          
          <Space>
            <StyledEventEditIcon onClick={() => onUpdate(event)} />
            <StyledEventDeleteIcon onClick={handleDelete} />
            <StyledEventCloseIcon onClick={onClear} />
          </Space>
          }
        </StyledEventDetailRightWrapper>
      </StyledEventDetailHeader>
      <Tabs defaultActiveKey="1" items={items} />
    </StyledEventDetailContainer>
  );
};

export default EventDetail;
