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

const NotificationComponent = () => {
  return (
    <StyledMiddleChartCardWrapper className='scrollbar-hide'>
     <StyledChartCardHeaderWrapper className='mb-5'>
        <StyledChartCardHeaderTitle>Notifications</StyledChartCardHeaderTitle>
        <StyledChartCardHeaderImg src="/img/moreDark.png" alt="this is an elipses" />
    </StyledChartCardHeaderWrapper> 
    <StyledNotificationContainer>
        <StyledNotificationWrapper bg={"blue"}>
            <StyledNotificationHeaderDiv className="flex items-center justify-between">
                <StyledNotificationHeaderTitle>Midterm Exams</StyledNotificationHeaderTitle>
                <StyledNotificationHeaderDate>2024-10-10</StyledNotificationHeaderDate>
            </StyledNotificationHeaderDiv>
            <StyledNotificationDescription>
            Midterm exams will start next week. Please ensure you are prepared and have all necessary materials. 
            </StyledNotificationDescription>
        </StyledNotificationWrapper>
        <StyledNotificationWrapper bg={"green"}>
            <StyledNotificationHeaderDiv className="flex items-center justify-between">
                <StyledNotificationHeaderTitle>School Closed</StyledNotificationHeaderTitle>
                <StyledNotificationHeaderDate>2024-10-14</StyledNotificationHeaderDate>
            </StyledNotificationHeaderDiv>
            <StyledNotificationDescription>
             The school will be closed on Friday for a public holiday. Classes will resume on Monday. 
            </StyledNotificationDescription>
        </StyledNotificationWrapper>
        <StyledNotificationWrapper bg={"greenLight"}>
            <StyledNotificationHeaderDiv className="flex items-center justify-between">
                <StyledNotificationHeaderTitle>Field Trip</StyledNotificationHeaderTitle>
                <StyledNotificationHeaderDate>2024-11-01</StyledNotificationHeaderDate>
            </StyledNotificationHeaderDiv>
            <StyledNotificationDescription>
            The annual field trip is scheduled for next month. Permission slips will be distributed soon.
            </StyledNotificationDescription>
        </StyledNotificationWrapper>
        <StyledNotificationWrapper bg={"red"}>
            <StyledNotificationHeaderDiv className="flex items-center justify-between">
                <StyledNotificationHeaderTitle>Field Trip</StyledNotificationHeaderTitle>
                <StyledNotificationHeaderDate>2024-11-01</StyledNotificationHeaderDate>
            </StyledNotificationHeaderDiv>
            <StyledNotificationDescription>
            The annual field trip is scheduled for next month. Permission slips will be distributed soon.
            </StyledNotificationDescription>
        </StyledNotificationWrapper>
    </StyledNotificationContainer>
      </StyledMiddleChartCardWrapper>
  )
}

export default NotificationComponent