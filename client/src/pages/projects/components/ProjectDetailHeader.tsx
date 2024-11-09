import { defaultTheme, PROJECT_ROUTE } from "_constants";
import {
  StyledDetailCloseIcon,
  StyledDetailEditIcon,
  StyledDetailMoreIcon,
  StyledProgress,
  StyledTitleContainer,
  StyledTopContainer,
  StyledTopIconWrapper,
  StyledTopWrapper,
  StyleTopLeftWrapper,
  StyleTopRightWrapper,
} from "../index.styled";
import { DetailInfoPopover, StyledCommentIcon, StyledPageTitle, StyledProjectIcon, StyledTagContainer } from "_lib";
import { Divider, Dropdown, MenuProps, Tag } from "antd";
import { IProject } from "interfaces";
import { StyledDeleteIcon } from "pages/bugs/index.styled";
import { StyledActionTitle, StyledMenuItemActions } from "pages/users/index.styled";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { StyledSearchProjectIcon } from "_lib/AppSearchComponent/index.styled";

const ProjectDetailHeader = ({ project, onEdit, deleteProject } : { project : IProject, onEdit: () => void, deleteProject: (project: IProject) => void }) => {
  const status = project.currentStatus!;
  const navigate = useNavigate();

  const onClose = useCallback(() => {
    if (window.history?.length && window.history.length > 1) {
      navigate(-1);
   } else {
      navigate(PROJECT_ROUTE, { replace: true });
   }
  }, [navigate])

  const menuItems = useCallback((): MenuProps['items'] => {

    return [
      {
        key: 'edit',
        label: (
          <StyledMenuItemActions>
            <StyledDetailEditIcon />
            <StyledActionTitle>Edit Project</StyledActionTitle>
          </StyledMenuItemActions>
        ),
        onClick: onEdit,
      },
      
      {
        key: 'delete',
        label: (
          <StyledMenuItemActions>
            <StyledDeleteIcon />
            <StyledActionTitle style={{ color: defaultTheme.theme.palette.status.team}}>Delete Project</StyledActionTitle>
          </StyledMenuItemActions>
        ),
        onClick: (e) => deleteProject(project),
      },
    ];
  }, [deleteProject, onEdit, project]);

  return (
    <StyledTopContainer>
      <Tag style={{ marginBottom: 5 }}>
        <StyledTopIconWrapper>
        <StyledSearchProjectIcon /> Project
        </StyledTopIconWrapper>
      </Tag>
      <StyledTopWrapper>
    <StyleTopLeftWrapper>
      <StyledProgress
        size="small"
        type="circle"
        strokeColor={"#12CC1B"}
        percent={Math.round(project.projectStatus!)}
      />
      <StyledTitleContainer>
        <StyledPageTitle>{ project?.projectName }</StyledPageTitle>
        <StyledTagContainer>
          <Tag color={`${
            status === "Delayed"  ? "#C5A070" : status === "Active" ? "#2CC8BA" : status === "InProgress" ? "#08AEEA" : status === "OnTrack" ? "#74CB80" : status === "InTesting" ? "#F6A96D" : "#FBC11E"
          }`}>{status}</Tag> 
          <Divider type="vertical" />
          <StyledCommentIcon /> 
          <Divider type="vertical" />
          <DetailInfoPopover info={project} isOwner={true} />
        </StyledTagContainer>
      </StyledTitleContainer>
      </StyleTopLeftWrapper>
      <StyleTopRightWrapper>
        <Dropdown menu={{ items: menuItems() }}>
         <StyledDetailMoreIcon />
        </Dropdown>
        <StyledDetailCloseIcon onClick={onClose} />
      </StyleTopRightWrapper>
      </StyledTopWrapper>
    </StyledTopContainer>
  );
};

export default ProjectDetailHeader;
