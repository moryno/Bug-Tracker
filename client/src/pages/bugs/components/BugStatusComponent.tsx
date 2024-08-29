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


const BugStatusComponent = ({ status} : { status: string}) => {
  return (
    <StyledCardWrapper>
       <StyledBugStatusContainer>
        <StyledStatusDot />
        <StyledBugStatusText>{status}</StyledBugStatusText>
        <StyledDropDownIcon />
      </StyledBugStatusContainer>
      <StyledBugStatusTitle>CURRENT STATUS</StyledBugStatusTitle>
    </StyledCardWrapper>
  )
}

export default BugStatusComponent