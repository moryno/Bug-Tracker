import moment from 'moment';
import { StyledChartCardHeaderImg, 
  StyledChartCardHeaderTitle, 
  StyledChartCardHeaderWrapper, 
  StyledChartCardWrapper, 
  StyledWorkItemBugIcon, 
  StyledWorkItemDueDate, 
  StyledWorkItemInfoDesc, 
  StyledWorkItemInfoTitle, 
  StyledWorkItemInfoWrapper, 
  StyledWorkItemLeftDiv, 
  StyledWorkItemWrapper
 } from '../index.styled';
import { useCallback } from 'react';
import { BUG_ROUTE } from '_constants';
import { useNavigate } from 'react-router-dom';

const WorkItemsComponent = ({ workItems } : { workItems : any[]}) => {
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    navigate(BUG_ROUTE)
  }, [navigate])
  
  return (
    <StyledChartCardWrapper className='scrollbar-hide'>
    <StyledChartCardHeaderWrapper  className='mb-2'>
     <StyledChartCardHeaderTitle>My Work Items Due This Week</StyledChartCardHeaderTitle>
     <StyledChartCardHeaderImg onClick={handleNavigate} src="/img/moreDark.png" alt="this is an elipses" />
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