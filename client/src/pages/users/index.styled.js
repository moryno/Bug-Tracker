import { defaultTheme } from "_constants";
import { Menu } from "antd";
import styled from "styled-components";
import { BsPersonSquare } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";
import { TbUserCancel } from "react-icons/tb";

export const StyledUserContainer = styled.main``;
export const StyledUserTitleWrapper = styled.section``;
export const StyledUserTitle = styled.h2`
  margin: 0;
  padding: 0;
  color: ${defaultTheme.theme.palette.gray[900]};
`;
export const StyledUserSubTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: ${defaultTheme.theme.palette.gray[500]};
`;
export const StyledUserFilterWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const StyledUserFilterLeftWrapper = styled.article``;
export const StyledUserTableTitle = styled.h3`
  margin: 0;
  padding: 0;
  color: ${defaultTheme.theme.palette.gray[900]};
`;
export const StyledUserFilterRightWrapper = styled.article``;
export const StyledMenuItem = styled(Menu.Item)`
  display: flex;
  align-items: center;
  gap: 6px;
`;
export const StyledMenuItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;
export const StyledActionImg = styled.img`
  height: 18px;
  width: 18px;
  cursor: pointer;
`;
export const StyledActionTitle = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${defaultTheme.theme.palette.gray[500]};
`;
export const StyledUserProfileIcon = styled(BsPersonSquare).attrs({
  fontSize: 18,
  color: defaultTheme.theme.palette.status.active,
})`
  cursor: pointer;
`;
export const StyledUserEditIcon = styled(CiEdit).attrs({
  fontSize: 18,
  color: defaultTheme.theme.palette.status.inProgress,
})`
  cursor: pointer;
`;
export const StyledUserRoleIcon = styled(IoKeyOutline).attrs({
  fontSize: 18,
  color: defaultTheme.theme.palette.status.onHold,
})`
  cursor: pointer;
`;
export const StyledUserDeactivateIcon = styled(TbUserCancel).attrs({
  fontSize: 18,
  color: defaultTheme.theme.palette.status.team,
})`
  cursor: pointer;
`;
