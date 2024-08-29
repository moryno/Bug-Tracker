import {
  StyledInfo,
  StyledNameText,
  StyledTitleContainer,
  StyledTopContainer,
} from "../index.styled";
import {  StyledCommentIcon, StyledPageTitle, StyledProjectIcon, StyledTagContainer } from "_lib";
import { IBug } from "interfaces";

const BugDetailHeader = ({ bug }: { bug: IBug }) => {
  return (
    <StyledTopContainer>
      <StyledTitleContainer>
        <StyledPageTitle>{bug?.bugName}</StyledPageTitle>
        <StyledTagContainer>
          <StyledNameText>By { bug?.createdUser }</StyledNameText> <span>|</span>
          <StyledProjectIcon /> 
          <StyledNameText>Project 1</StyledNameText>
           <span>|</span>
          <StyledCommentIcon /> <span>|</span>
          <StyledInfo />
        </StyledTagContainer>
      </StyledTitleContainer>
    </StyledTopContainer>
  );
};

export default BugDetailHeader;
