import React from "react";
import {
  StyledComment,
  StyledInfo,
  StyledProgress,
  StyledTagContainer,
  StyledTitleContainer,
  StyledTopContainer,
} from "../index.styled";
import { StyledPageTitle } from "_lib";
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
          <Tag>Completed</Tag> {"|"}
          <StyledComment /> |
          <StyledInfo />
        </StyledTagContainer>
      </StyledTitleContainer>
    </StyledTopContainer>
  );
};

export default ProjectDetailHeader;
