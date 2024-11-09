import { 
    StyledChartCardHeaderImg, 
    StyledChartCardHeaderTitle, 
    StyledChartCardHeaderWrapper, 
    StyledMiddleChartCardWrapper, 
    StyledNotificationContainer, 
    StyledNotificationDescription, 
    StyledNotificationHeaderDate, 
    StyledNotificationHeaderDiv, 
    StyledNotificationHeaderTitle,
    StyledNotificationWrapper
     } from '../index.styled';
import { EVENT_ROUTE } from '_constants';
import { Spin } from 'antd';
import { INotification } from 'interfaces';
import moment from 'moment';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState } from '_redux';
import { useSelector } from 'react-redux';

const NotificationComponent = () => {
    const { notifications, isFetching } = useSelector((store: RootState) => store.notification);
    const navigate = useNavigate();

    const handleNavigate = useCallback(() => {
      navigate(EVENT_ROUTE)
    }, [navigate])

  return (
    isFetching ? <Spin /> :
    <StyledMiddleChartCardWrapper className='scrollbar-hide'>
     <StyledChartCardHeaderWrapper className='mb-5'>
        <StyledChartCardHeaderTitle>Notifications</StyledChartCardHeaderTitle>
        <StyledChartCardHeaderImg onClick={handleNavigate} src="/img/moreDark.png" alt="this is an elipses" />
    </StyledChartCardHeaderWrapper> 
    <StyledNotificationContainer>
    {notifications?.map((notification : INotification, index: number) => (
        <StyledNotificationWrapper key={notification.id} bg={index.toString()}>
        <StyledNotificationHeaderDiv className="flex items-center justify-between">
            <StyledNotificationHeaderTitle>{notification.eventTitle}</StyledNotificationHeaderTitle>
            <StyledNotificationHeaderDate>{moment(notification?.eventStartDate).format("YYYY-MM-DD")}</StyledNotificationHeaderDate>
        </StyledNotificationHeaderDiv>
        <StyledNotificationDescription>
         {notification.message}
        </StyledNotificationDescription>
    </StyledNotificationWrapper>
    ))}
        
    </StyledNotificationContainer>
      </StyledMiddleChartCardWrapper>
  )
}

export default NotificationComponent