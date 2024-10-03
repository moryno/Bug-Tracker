import { StyledAssigneeImage } from 'pages/projects/index.styled';
import { 
    StyledChartCardHeaderImg, 
    StyledChartCardHeaderTitle, 
    StyledChartCardHeaderWrapper, 
    StyledMiddleChartCardWrapper, 
    StyledWorkItemInfoDesc, 
    StyledWorkItemInfoTitle, 
    StyledWorkItemInfoWrapper, 
    StyledWorkItemLeftDiv, 
    StyledWorkItemMailIcon, 
    StyledWorkItemProfileIcon, 
    StyledWorkItemRightDiv, 
    StyledWorkItemWrapper 
} from '../index.styled';

export const TeamMembersComponent = ({ team} : { team : any[]}) => {
  return (
    <StyledMiddleChartCardWrapper className='scrollbar-hide'>
    <StyledChartCardHeaderWrapper className='mb-2'>
     <StyledChartCardHeaderTitle>Team</StyledChartCardHeaderTitle>
      <StyledChartCardHeaderImg src="/img/moreDark.png" alt="this is an elipses" />
    </StyledChartCardHeaderWrapper> 
    { team && team?.map(( user : any) => (
        <StyledWorkItemWrapper key={user?.id}>
            <StyledWorkItemLeftDiv>
                <StyledAssigneeImage src={ user?.image || "/img/noavatar.jpg" } />
                <StyledWorkItemInfoWrapper>
                    <StyledWorkItemInfoTitle>{ user?.fullName }</StyledWorkItemInfoTitle>
                    <StyledWorkItemInfoDesc>{ user?.roles?.join(", ") }</StyledWorkItemInfoDesc>
                </StyledWorkItemInfoWrapper>
            </StyledWorkItemLeftDiv>
            <StyledWorkItemRightDiv>
                <StyledWorkItemProfileIcon />
                <StyledWorkItemMailIcon />
            </StyledWorkItemRightDiv>
        </StyledWorkItemWrapper>
    ))}

    
   </StyledMiddleChartCardWrapper>
  )
}
