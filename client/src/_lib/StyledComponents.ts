import { defaultTheme } from "_constants";
import styled from "styled-components";
import { FaBriefcase, FaBug } from "react-icons/fa";
import { MdOutlineMessage, MdOutlineArrowDropDown } from "react-icons/md";
import { Card, Col, Table } from "antd";

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
export const StyledComment = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${defaultTheme.theme.palette.gray[500]};
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
