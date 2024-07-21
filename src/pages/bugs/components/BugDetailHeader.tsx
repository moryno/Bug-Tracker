import React from "react";
import {
  StyledInfo,
  StyledNameText,
  StyledTitleContainer,
  StyledTopContainer,
} from "../index.styled";
import {  StyledCommentIcon, StyledPageTitle, StyledProjectIcon, StyledTagContainer } from "_lib";

const BugDetailHeader = () => {
  return (
    <StyledTopContainer>
      <StyledTitleContainer>
        <StyledPageTitle>Bug 1</StyledPageTitle>
        <StyledTagContainer>
          <StyledNameText>By Maurice Nganga</StyledNameText> <span>|</span>
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
