import { defaultTheme } from "_constants";
import styled from "styled-components";
import { FaBriefcase, FaBug, FaCheck, FaRegEdit } from "react-icons/fa";
import {
  MdOutlineMessage,
  MdOutlineArrowDropDown,
  MdDelete,
} from "react-icons/md";
import { Button, Card, Col, Collapse, Drawer, Modal, Table } from "antd";
import { IoClose } from "react-icons/io5";
import { FaFilter, FaPlus } from "react-icons/fa6";

interface DemoTitle {
  color?: string;
}

export const StyledUserIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${defaultTheme.theme.palette.green[600]};
  color: ${defaultTheme.theme.palette.white};
  font-weight: 500;
`;

export const PanelTitle = styled.h3`
  padding: 0;
  margin: 0;
  font-weight: 500;
  font-size: 15px;
  color: ${defaultTheme.theme.palette.gray[900]};
`;
export const StyledComment = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${defaultTheme.theme.palette.gray[500]};
  padding: 0;
  margin: 0;
`;
export const StyledPageTitle = styled.h3`
  padding: 0;
  margin: 0;
  color: ${defaultTheme.theme.palette.gray[600]};
`;
export const StyledPageCard = styled.main`
  // padding: 10px 16px;
`;
export const StyledDetailPageCardWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const StyledInfoLabel = styled.h3`
  padding: 0;
  margin: 0;
  font-weight: 500;
  font-size: 15px;
  color: ${defaultTheme.theme.palette.gray[500]};
`;

export const StyledInfoText = styled.p`
  padding: 0;
  margin: 0;
  font-weight: 500;
  font-size: 15px;
  color: ${defaultTheme.theme.text};
`;

export const StyledProjectIcon = styled(FaBriefcase).attrs({
  fontSize: 18,
  color: defaultTheme.theme.palette.status.planning,
})``;
export const StyledBugIcon = styled(FaBug).attrs({
  fontSize: 18,
  color: defaultTheme.theme.palette.status.planning,
})``;
export const StyledTagContainer = styled.article`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const StyledInfoDivContainer = styled(Col).attrs({})`
  padding: 10px 0;
  border-bottom: 0.5px solid ${defaultTheme.theme.palette.gray[100]};
`;

export const StyledInfoDivWrapper = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

export const StyledUserWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const StyledCommentIcon = styled(MdOutlineMessage).attrs({
  fontSize: 16,
})``;
export const StyledDropDownIcon = styled(MdOutlineArrowDropDown).attrs({
  fontSize: 20,
})``;
export const StyledCheckedIcon = styled(FaCheck).attrs({
  fontSize: 20,
})``;
export const StyledButtonGroup = styled(Button.Group)`
  width: 100%;
  margin-top: 10px;
`;
export const StyledCloseIcon = styled(IoClose).attrs({
  fontSize: 20,
})``;
export const StyledCardWrapper = styled(Card)`
  .ant-card-body {
    padding: 10px;
  }
`;
export const StyledTableCardWrapper = styled(Card)`
  .ant-card-body {
    padding: 0px;
  }
`;
export const StyledTable = styled(Table)`
  .ant-table-cell {
    background: transparent !important;
    padding: 8px 16px !important;
  }
  .ant-table-row {
    &:hover {
      background: #f0fdf4 !important;
      cursor: pointer;
    }
  }
`;
export const StyledEditIcon = styled(FaRegEdit).attrs({
  fontSize: 22,
  color: defaultTheme.theme.palette.status.onHold,
})`
  cursor: pointer;
`;
export const StyledFilterIcon = styled(FaFilter).attrs({
  fontSize: 18,
  color: defaultTheme.theme.palette.status.onHold,
})`
  cursor: pointer;
`;
export const StyledNewIcon = styled(FaPlus).attrs({
  fontSize: 18,
  color: defaultTheme.theme.palette.primary.main,
})`
  cursor: pointer;
`;
export const StyledDeleteIcon = styled(MdDelete).attrs({
  fontSize: 18,
  color: defaultTheme.theme.palette.status.team,
})`
  cursor: pointer;
`;
export const StyledIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 5px;
  border-radius: 50%;
`;
export const StyledModal = styled(Modal)`
  .ant-modal-header {
    // padding: 10px 24px;
    // border-radius: 10px 10px 0px 0px;
    display: none;
  }
  .ant-modal-close {
    // display: none;
  }
  .ant-modal-footer {
    border: none;
  }

  .ant-modal-body {
    padding: 0px 20px;
  }
  .ant-modal-content {
    border-radius: 10px !important;
  }
`;
export const StyledPhotoStepLabel = styled.h2`
  padding: 0;
  margin: 0 0 20px;
  font-weight: 500;
  font-size: 17px;
  color: ${defaultTheme.theme.palette.status.completed};
`;
export const StyledAppNotificationWrapper = styled.article`
  flex: 1;
  height: 90%;
  overflow-y: auto;
  background-color: white;
  padding: 16px 0;
`;
export const StyledMediumDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 0px !important;
  }
  .ant-drawer-title {
    font-size: 14px !important;
  }
  .ant-drawer-header {
    padding: 8px 24px !important;
  }
`;
export const StyledContainerDrawer = styled(Drawer)`
  .ant-drawer-title {
    font-size: 14px !important;
  }
  .ant-drawer-header {
    padding: 8px 24px !important;
  }
  .ant-drawer-close {
    align-self: end;
  }
`;
export const StyledFilterCollapseContainer = styled(Collapse)`
  .ant-collapse-header {
    padding: 6px 24px !important;
    display: flex !important;
    justify-content: space-between !important;
  }
  .ant-collapse-content-box {
    padding-block: 6px !important;
  }
`;
export const StyledDomainFilterContainer = styled.section`
  height: 100%;
  overflow-y: auto;
  background-color: white;
`;
export const StyledFormButtonContainer = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;
export const StyledTextEditorContainer = styled.article`
  width: 100%;
  position: relative;
  margin-bottom: 20px;
`;
export const StyledDemoUserWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
`;
export const StyledDemoUserinfoContainer = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 47%;
  gap: 5px;
`;
export const StyledDemoInfoText = styled.p<DemoTitle>`
  padding: 0;
  margin: 0;
  font-weight: 500;
  font-size: 15px;
  color: ${({ theme, color }) => theme.palette.status[color!]};
`;
