import { StyledCardIcon, StyledHomeCard, StyledHomeCardCount, StyledHomeCardDiv, StyledHomeCardTitle } from "../index.styled"
import { useCallback } from "react";
import { dashCardType } from "_constants";


const Card = ({ title, count } : { title: string, count: number }) => {
    
    const dashCardIcons = useCallback((e: string) => {
        switch (e) {
          case dashCardType.activeProjects:
            return "/img/default-projects.png";
          case dashCardType.completedProjects:
            return "/img/default-projects.png";
          case dashCardType.openTickets:
            return "/img/default-tickets.png";
          case dashCardType.unassignedTickets:
            return "/img/unassigned-tickets.png";
          case dashCardType.teamMembers:
            return "/img/default-team.png";
          default:
            break;
        }
      }, []);
  return (
    <StyledHomeCard bg={title}>
        <StyledHomeCardDiv>
            <StyledHomeCardCount>{ count }</StyledHomeCardCount>
            <StyledCardIcon src={dashCardIcons(title)} />
        </StyledHomeCardDiv>
        <StyledHomeCardDiv>
            <StyledHomeCardTitle>{ title }</StyledHomeCardTitle>
        </StyledHomeCardDiv>
    </StyledHomeCard>
  )
}

export default Card