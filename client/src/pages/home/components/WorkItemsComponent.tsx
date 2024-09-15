import { StyledChartCardHeaderImg, StyledChartCardHeaderTitle, StyledChartCardHeaderWrapper, StyledChartCardWrapper, StyledWorkItemBugIcon, StyledWorkItemDueDate, StyledWorkItemInfoDesc, StyledWorkItemInfoTitle, StyledWorkItemInfoWrapper, StyledWorkItemLeftDiv, StyledWorkItemWrapper } from '../index.styled';

const WorkItemsComponent = () => {
  return (
    <StyledChartCardWrapper className='scrollbar-hide'>
    <StyledChartCardHeaderWrapper>
     <StyledChartCardHeaderTitle>My Work Items Due Today</StyledChartCardHeaderTitle>
     <StyledChartCardHeaderImg src="/img/moreDark.png" alt="this is an elipses" />
   </StyledChartCardHeaderWrapper> 
   <StyledWorkItemWrapper>
    <StyledWorkItemLeftDiv>
        <StyledWorkItemBugIcon />
        <StyledWorkItemInfoWrapper>
            <StyledWorkItemInfoTitle>Create additional 'Custom Fields' for bugs to store a...</StyledWorkItemInfoTitle>
            <StyledWorkItemInfoDesc>Explore Spike Bug Tracker!</StyledWorkItemInfoDesc>
        </StyledWorkItemInfoWrapper>
    </StyledWorkItemLeftDiv>
    <StyledWorkItemDueDate>07-12-2024</StyledWorkItemDueDate>
   </StyledWorkItemWrapper>
   <StyledWorkItemWrapper>
    <StyledWorkItemLeftDiv>
        <StyledWorkItemBugIcon />
        <StyledWorkItemInfoWrapper>
            <StyledWorkItemInfoTitle>Create additional 'Custom Fields' for bugs to store a...</StyledWorkItemInfoTitle>
            <StyledWorkItemInfoDesc>Explore Spike Bug Tracker!</StyledWorkItemInfoDesc>
        </StyledWorkItemInfoWrapper>
    </StyledWorkItemLeftDiv>
    <StyledWorkItemDueDate>07-12-2024</StyledWorkItemDueDate>
   </StyledWorkItemWrapper>
   <StyledWorkItemWrapper>
    <StyledWorkItemLeftDiv>
        <StyledWorkItemBugIcon />
        <StyledWorkItemInfoWrapper>
            <StyledWorkItemInfoTitle>Create additional 'Custom Fields' for bugs to store a...</StyledWorkItemInfoTitle>
            <StyledWorkItemInfoDesc>Explore Spike Bug Tracker!</StyledWorkItemInfoDesc>
        </StyledWorkItemInfoWrapper>
    </StyledWorkItemLeftDiv>
    <StyledWorkItemDueDate>07-12-2024</StyledWorkItemDueDate>
   </StyledWorkItemWrapper>
   <StyledWorkItemWrapper>
    <StyledWorkItemLeftDiv>
        <StyledWorkItemBugIcon />
        <StyledWorkItemInfoWrapper>
            <StyledWorkItemInfoTitle>Create additional 'Custom Fields' for bugs to store a...</StyledWorkItemInfoTitle>
            <StyledWorkItemInfoDesc>Explore Spike Bug Tracker!</StyledWorkItemInfoDesc>
        </StyledWorkItemInfoWrapper>
    </StyledWorkItemLeftDiv>
    <StyledWorkItemDueDate>07-12-2024</StyledWorkItemDueDate>
   </StyledWorkItemWrapper>
   <StyledWorkItemWrapper>
    <StyledWorkItemLeftDiv>
        <StyledWorkItemBugIcon />
        <StyledWorkItemInfoWrapper>
            <StyledWorkItemInfoTitle>Create additional 'Custom Fields' for bugs to store a...</StyledWorkItemInfoTitle>
            <StyledWorkItemInfoDesc>Explore Spike Bug Tracker!</StyledWorkItemInfoDesc>
        </StyledWorkItemInfoWrapper>
    </StyledWorkItemLeftDiv>
    <StyledWorkItemDueDate>07-12-2024</StyledWorkItemDueDate>
   </StyledWorkItemWrapper>
   <StyledWorkItemWrapper>
    <StyledWorkItemLeftDiv>
        <StyledWorkItemBugIcon />
        <StyledWorkItemInfoWrapper>
            <StyledWorkItemInfoTitle>Create additional 'Custom Fields' for bugs to store a...</StyledWorkItemInfoTitle>
            <StyledWorkItemInfoDesc>Explore Spike Bug Tracker!</StyledWorkItemInfoDesc>
        </StyledWorkItemInfoWrapper>
    </StyledWorkItemLeftDiv>
    <StyledWorkItemDueDate>07-12-2024</StyledWorkItemDueDate>
   </StyledWorkItemWrapper>
 </StyledChartCardWrapper>
  )
}

export default WorkItemsComponent