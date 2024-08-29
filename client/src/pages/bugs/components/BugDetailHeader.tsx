import {
  StyledNameText,
  StyledTitleContainer,
  StyledTopContainer,
} from "../index.styled";
import {  DetailInfoPopover, StyledCommentIcon, StyledPageTitle, StyledProjectIcon, StyledTagContainer } from "_lib";
import { IBug } from "interfaces";

const BugDetailHeader = ({ bug }: { bug: IBug }) => {
  return (
    <StyledTopContainer>
      <StyledTitleContainer>
        <StyledPageTitle>{bug?.bugName}</StyledPageTitle>
        <StyledTagContainer>
          <StyledNameText>By { bug?.createdUser }</StyledNameText> <span>|</span>
          <StyledProjectIcon /> 
          <StyledNameText>{ bug?.projectName }</StyledNameText>
           <span>|</span>
          <StyledCommentIcon /> <span>|</span>
          <DetailInfoPopover info={bug} />
        </StyledTagContainer>
      </StyledTitleContainer>
    </StyledTopContainer>
  );
};

export default BugDetailHeader;
