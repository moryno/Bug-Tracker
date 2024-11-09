import { BUG_ROUTE, defaultTheme } from "_constants";
import {
  StyledDeleteIcon,
  StyledNameText,
  StyledTitleContainer,
} from "../index.styled";
import {   DetailInfoPopover, StyledBugIcon, StyledCommentIcon, StyledPageTitle, StyledProjectIcon, StyledTagContainer } from "_lib";
import { Divider, Dropdown, MenuProps, Tag } from "antd";
import { IBug } from "interfaces";
import { StyledDetailCloseIcon, StyledDetailEditIcon, StyledDetailMoreIcon, StyledTopContainer, StyledTopIconWrapper, StyledTopWrapper, StyleTopLeftWrapper, StyleTopRightWrapper } from "pages/projects/index.styled";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { StyledActionTitle, StyledMenuItemActions } from "pages/users/index.styled";
import { StyledSearchBugIcon } from "_lib/AppSearchComponent/index.styled";


const BugDetailHeader = ({ bug, openForm, deletBug }: { bug: IBug, openForm: () => void, deletBug: (bug: IBug) => void }) => {
  const navigate = useNavigate();

  const onClose = useCallback(() => {
    if (window.history?.length && window.history.length > 1) {
      navigate(-1);
   } else {
      navigate(BUG_ROUTE, { replace: true });
   }
  }, [navigate])

  const menuItems = useCallback((): MenuProps['items'] => {

    return [
      {
        key: 'edit',
        label: (
          <StyledMenuItemActions>
            <StyledDetailEditIcon />
            <StyledActionTitle>Edit Bug</StyledActionTitle>
          </StyledMenuItemActions>
        ),
        onClick: openForm,
      },
      
      {
        key: 'delete',
        label: (
          <StyledMenuItemActions>
            <StyledDeleteIcon />
            <StyledActionTitle style={{ color: defaultTheme.theme.palette.status.team}}>Delete Bug</StyledActionTitle>
          </StyledMenuItemActions>
        ),
        onClick: (e) => deletBug(bug),
      },
    ];
  }, [bug, deletBug, openForm]);

  return (
    <StyledTopContainer>
      <Tag style={{ marginBottom: 5 }}>
        <StyledTopIconWrapper>
        <StyledSearchBugIcon /> Bug
        </StyledTopIconWrapper>
      </Tag>
      <StyledTopWrapper>
      <StyleTopLeftWrapper>
      <StyledTitleContainer>
        <StyledPageTitle>{bug?.bugName}</StyledPageTitle>
        <StyledTagContainer>
          <StyledNameText>By { bug?.createdUser }</StyledNameText> 
          <Divider type="vertical" />
          <StyledProjectIcon /> 
          <StyledNameText>{ bug?.projectName }</StyledNameText>
          <Divider type="vertical" />
          <StyledCommentIcon /> 
          <Divider type="vertical" />
          <DetailInfoPopover info={bug} />
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

export default BugDetailHeader;
