import React from "react";
import {
  StyledInfo,
  StyledProgress,
  StyledTitleContainer,
  StyledTopContainer,
} from "../index.styled";
import { StyledCommentIcon, StyledPageTitle, StyledTagContainer } from "_lib";
import { Tag } from "antd";

const ProjectDetailHeader = () => {
  return (
    <StyledTopContainer>
      <StyledProgress
        size="small"
        type="circle"
        strokeColor={"#12CC1B"}
        percent={75}
      />
      <StyledTitleContainer>
        <StyledPageTitle>Project 1</StyledPageTitle>
        <StyledTagContainer>
          <Tag>Completed</Tag> <span>|</span>
          <StyledCommentIcon /> <span>|</span>
          <StyledInfo />
        </StyledTagContainer>
      </StyledTitleContainer>
    </StyledTopContainer>
  );
};

export default ProjectDetailHeader;
