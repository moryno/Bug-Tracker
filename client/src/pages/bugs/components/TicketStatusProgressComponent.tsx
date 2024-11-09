import {   StyledChartCardHeaderTitle, StyledChartCardHeaderWrapper  } from 'pages/home/index.styled';
import { StyledProgress } from 'pages/projects/index.styled';
import { StyledBugChartCardWrapper, StyledBugProgressWrapper } from '../index.styled';

const TicketStatusProgressComponent = ({ title, count } : { title: string, count: number}) => {
    const getColor = (status: string) => {
        const COLORS:{ [key: string]: string } = { "Open" : "#12CC1B", "InProgress": "#08AEEA", "Completed": "#4ED3E5"};

        return COLORS[status] || "#f56b62";
    }
  return (
    <StyledBugChartCardWrapper>
        <StyledChartCardHeaderWrapper>
        <StyledChartCardHeaderTitle>Status { title }</StyledChartCardHeaderTitle>
     </StyledChartCardHeaderWrapper>
     <StyledBugProgressWrapper>
        <StyledProgress
            size={160}
            type="circle"
            strokeColor={getColor(title)}
            percent={Math.floor(count)}
        />
      </StyledBugProgressWrapper> 
    </StyledBugChartCardWrapper>
  )
}

export default TicketStatusProgressComponent