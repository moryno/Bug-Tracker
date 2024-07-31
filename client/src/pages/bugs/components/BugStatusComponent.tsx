import React from "react";
import {
    StyledBugStatusContainer,
    StyledBugStatusText,
  StyledBugStatusTitle,
  StyledStatusDot,
} from "../index.styled";
import {
    StyledCardWrapper,
  StyledDropDownIcon,

} from "_lib";


const BugStatusComponent = () => {
  return (
    <StyledCardWrapper>
       <StyledBugStatusContainer>
        <StyledStatusDot />
        <StyledBugStatusText>Open</StyledBugStatusText>
        <StyledDropDownIcon />
      </StyledBugStatusContainer>
      <StyledBugStatusTitle>CURRENT STATUS</StyledBugStatusTitle>
    </StyledCardWrapper>
  )
}

export default BugStatusComponent