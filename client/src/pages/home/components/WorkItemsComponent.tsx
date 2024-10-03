import moment from 'moment';
import { StyledChartCardHeaderImg, StyledChartCardHeaderTitle, StyledChartCardHeaderWrapper, StyledChartCardWrapper, StyledWorkItemBugIcon, StyledWorkItemDueDate, StyledWorkItemInfoDesc, StyledWorkItemInfoTitle, StyledWorkItemInfoWrapper, StyledWorkItemLeftDiv, StyledWorkItemWrapper } from '../index.styled';

const WorkItemsComponent = ({ workItems } : { workItems : any[]}) => {
  return (
    <StyledChartCardWrapper className='scrollbar-hide'>
    <StyledChartCardHeaderWrapper  className='mb-2'>
     <StyledChartCardHeaderTitle>My Work Items Due This Week</StyledChartCardHeaderTitle>
     <StyledChartCardHeaderImg src="/img/moreDark.png" alt="this is an elipses" />
   </StyledChartCardHeaderWrapper> 
   { workItems && workItems?.map(( bug : any) => (
      <StyledWorkItemWrapper key={bug?.id}>
           <StyledWorkItemLeftDiv>
               <StyledWorkItemBugIcon />
               <StyledWorkItemInfoWrapper>
                   <StyledWorkItemInfoTitle>{ bug?.description }</StyledWorkItemInfoTitle>
                   <StyledWorkItemInfoDesc>{ bug?.bugName }</StyledWorkItemInfoDesc>
               </StyledWorkItemInfoWrapper>
           </StyledWorkItemLeftDiv>
           <StyledWorkItemDueDate>{ moment(bug?.dueDate).format('MM DD YYYY') }</StyledWorkItemDueDate>
      </StyledWorkItemWrapper>
   ))}

   
 </StyledChartCardWrapper>
  )
}

export default WorkItemsComponent