import { Tag } from "antd";
import { StyledBugStatusContainer, StyledBugStatusTitle } from "../index.styled";
import { StyledCardWrapper } from "_lib";


const BugStatusComponent = ({ status } : { status: string}) => {
  return (
    <StyledCardWrapper>
       <StyledBugStatusContainer>
       <Tag color={`${status === "Open" ? "#2CC8BA" : status === "InProgress" ? "#08AEEA" : "#4ED3E5"}`}>{status}</Tag> 
      </StyledBugStatusContainer>
      <StyledBugStatusTitle>CURRENT STATUS</StyledBugStatusTitle>
    </StyledCardWrapper>
  )
}

export default BugStatusComponent