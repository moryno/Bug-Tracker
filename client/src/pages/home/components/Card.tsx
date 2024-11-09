import { StyledCardIcon, StyledHomeCard, StyledHomeCardCount, StyledHomeCardDiv, StyledHomeCardTitle } from "../index.styled"
import { useCallback } from "react";
import { BUG_ROUTE, dashCardType, PROJECT_ROUTE, USER_ROUTE } from "_constants";
import { useNavigate } from "react-router-dom";
import { setParams } from "_helpers";


const Card = ({ title, count, type } : { title: string, count: number, type: string }) => {
  const navigate = useNavigate();
    
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
    
    const onNavigate = useCallback(() => {
      if(type === "project"){
        if( title === "Active Projects")
        {
          let url = setParams("isActive", "True");
          navigate(`${PROJECT_ROUTE}?${url}`)
        } 
        else{
          let url = setParams("projectStatus", "Completed");
          navigate(`${PROJECT_ROUTE}?${url}`)
        }   
      }
      else if (type === "bug"){
        if( title === "Open Tickets")
          {
            let url = setParams("bugStatus", "Open");
            navigate(`${BUG_ROUTE}?${url}`)
          } 
          else{
            let url = setParams("unAssigneed", "True");
            navigate(`${BUG_ROUTE}?${url}`)
          } 
      }else {
        navigate(USER_ROUTE)
      }
    }, [navigate, title, type]);

  return (
    <StyledHomeCard onClick={onNavigate} bg={title}>
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