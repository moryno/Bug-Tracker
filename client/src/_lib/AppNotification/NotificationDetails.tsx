import { DomianEnum, PROJECT_ROUTE } from "_constants"
import AppComment from "_lib/AppComment"
import { StyledUserIcon } from "_lib/StyledComponents"
import { Spin, Tabs, TabsProps } from "antd"
import { AxiosResponse } from "axios"
import { commentType, IUser } from "interfaces"
import EventCalendar from "pages/events/components/EventCalendar"
import { StyledEventCalendarRange } from "pages/events/components/index.styled"
import {  useMemo } from "react"
import { IoMdPeople } from "react-icons/io"
import { Link } from "react-router-dom"
import { 
  StyledEventClock, 
  StyledEventDetailInfoWrapper, 
  StyledEventIcon, 
  StyledEventLocation, 
  StyledEventText, 
  StyledNotificationCalendarDiv, 
  StyledNotificationDetailContainer, 
  StyledNotificationDetailHeader, 
  StyledNotificationDetailSpan, 
  StyledNotificationDetailText, 
  StyledNotificationDetailTitle, 
  StyledNotificationDetailWrapper, 
  StyledNotificationEventTitle, 
  StyledNotificationInfoDiv, 
  StyledNotificationRedirect
 } from "./index.styled"
import { EventService } from "_services"
import { useGetById } from "_hooks"
import moment from "moment"
import { getAbbreviation } from "_helpers"

const queryString = `${DomianEnum.EVENT}-comments`;

const NotificationDetails = ({ parentId, organizerName } : { parentId : string, organizerName: string | undefined}) => {
    const { getEventDetails } = EventService;
    const { getEventComments, createEventComment, deleteEventComment } = EventService;
    const { isLoading, data: eventData } = useGetById(getEventDetails, DomianEnum.NOTIFICATIONS, parentId);

    const items: TabsProps["items"] = useMemo(
        () => [
          {
            key: "1",
            label: "Comments",
            children: (
              <AppComment 
                parentId={parentId!}
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
        [createEventComment, deleteEventComment, getEventComments, parentId]
      );

  return (
    <StyledNotificationDetailContainer className='scrollbar-hide'>
      {isLoading ? <Spin /> :
      <>
        <StyledNotificationDetailTitle>Title</StyledNotificationDetailTitle>
        <StyledNotificationDetailWrapper>
            <StyledNotificationDetailHeader>
            <StyledNotificationInfoDiv>
            <StyledUserIcon>{getAbbreviation(organizerName!)}</StyledUserIcon>
            <StyledNotificationDetailText>{organizerName} schedule an <StyledNotificationDetailSpan>Event</StyledNotificationDetailSpan>
             in <Link to={`${PROJECT_ROUTE}/${eventData?.data?.projectId}`}>{eventData?.data?.projectName}</Link>
             </StyledNotificationDetailText>
            </StyledNotificationInfoDiv>
            <StyledNotificationRedirect />
            </StyledNotificationDetailHeader>
            <StyledNotificationCalendarDiv>
              <EventCalendar startDate={eventData?.data?.startDate} endDate={eventData?.data?.endDate} />
            <StyledEventDetailInfoWrapper>
            <StyledNotificationEventTitle>
              <StyledEventIcon />
              {eventData?.data?.title}
            </StyledNotificationEventTitle>
            <StyledEventText>
            <StyledEventClock />
              {moment(eventData?.data?.startDate).format("hh:mmA")} To {moment(eventData?.data?.endDate).format("hh:mmA")} 
            </StyledEventText>
            <StyledEventText>
            <StyledEventLocation /> 
              { eventData?.data?.location || "Not Specified" }
            </StyledEventText>
            <StyledEventText><IoMdPeople /> <StyledEventCalendarRange>{
               eventData?.data?.attendees!.map((attendee: IUser) => attendee.fullName).join(", ")
            } </StyledEventCalendarRange></StyledEventText>
          </StyledEventDetailInfoWrapper>
            </StyledNotificationCalendarDiv>
            <Tabs defaultActiveKey="1" items={items} />
        </StyledNotificationDetailWrapper>
        </>
  }
    </StyledNotificationDetailContainer>
  )
}

export default NotificationDetails