import {
  StyledProgress,
  StyledTitleContainer,
  StyledTopContainer,
} from "../index.styled";
import { DetailInfoPopover, StyledCommentIcon, StyledPageTitle, StyledTagContainer } from "_lib";
import { Tag } from "antd";
import { IProject } from "interfaces";

const ProjectDetailHeader = ({ project } : { project : IProject }) => {
  return (
    <StyledTopContainer>
      <StyledProgress
        size="small"
        type="circle"
        strokeColor={"#12CC1B"}
        percent={Math.round(project.projectStatus!)}
      />
      <StyledTitleContainer>
        <StyledPageTitle>{ project?.projectName }</StyledPageTitle>
        <StyledTagContainer>
          <Tag>Completed</Tag> <span>|</span>
          <StyledCommentIcon /> <span>|</span>
          <DetailInfoPopover info={project} isOwner={true} />
        </StyledTagContainer>
      </StyledTitleContainer>
    </StyledTopContainer>
  );
};

export default ProjectDetailHeader;
