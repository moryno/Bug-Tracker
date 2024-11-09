import AppScrollbar from "_lib/AppScrollbar";
import { Input, Modal, Select, Typography } from "antd";
import { FaBriefcase, FaBug } from "react-icons/fa6";
import { MdEvent } from "react-icons/md";
import { styled } from "styled-components";

const { Text } = Typography;

export const StyledAppHeaderSearch = styled.div`
  display: flex;
  align-items: center;
  .bugtracker-search {
    cursor: pointer;
  }
`;

export const StyledAppHeaderSearchModalContent = styled(Modal)`
  top: 20px;

  .ant-modal-content {
    padding: 0px 0px 0px 0px;
    width: 900px;
    background: transparent;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    margin: 0px;
    top: 0px;
    .ant-modal-content {
      width: 100svw;
    }
  }
`;
export const StyledAppHeaderSearchWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 10px 20px;
  background: #fff;
  border-bottom: 1px solid
      ${({ theme }) => theme.palette.grey["Cool Grey"][200]} !important;
  }
`;
export const StyledAppHeaderSearchInput = styled(Input)`
  box-shadow: none;
  svg {
    cursor: pointer;
  }
  &.ant-input-affix-wrapper {
    border: none;
  

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    border-radius: 0px;
    padding: 20px 10px;
  }
`;
export const StyledAppHeaderSelectnput = styled(Select)`
  box-shadow: none;
  svg {
    cursor: pointer;
  }
  &.ant-select {
    border: none !important;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    border-radius: 0px;
    padding: 20px 10px;
  }
 &.ant-select-selector {
    border: none !important;
}
`;
export const StyledAppHeaderSearchSkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  .ant-skeleton-input {
    height: 80px !important;
    @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
      height: 50px !important;
    }
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xxs}px) {
    padding: 0px 10px;
  }
`;
export const StyledAppHeaderSearchError = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  text-align: center;
  span {
    &.ant-typography {
      font-size: 16px !important;
    }
  }
`;
export const StyledAppHeaderSearchScrollbar = styled(AppScrollbar)`
  max-height: calc(100svh - 180px);
  background: #fff;
  border-radius: 8px;
  overflow-x: hidden;
  padding: 0px 20px;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xxs}px) {
    padding: 0px 10px;
  }
`;
export const StyledSearcInfoContainer = styled.section`
  padding: 8px 0px;
  //   &:hover {
  //   background-color: ${({ theme }) => theme.palette.grey["Cool Grey"][200]};
  // }
  //   border-bottom: 1px solid
  //     ${({ theme }) => theme.palette.grey["Cool Grey"][200]} !important;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    padding: 8px 0px;
  }
`;
export const StyledSearcInfoHeaderContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    justify-content: space-between;
  }
`;
export const StyledSearchInfoContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  width: 100%;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    justify-content: space-between;
  }
`;
export const StyleInfoPeriodText = styled(Text)`
  color: ${({ theme }) => theme.palette.gray[600]};
  font-weight: 700;
  white-space: nowrap;
  font-size: 12px;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    font-size: 12px;
  }
`;
export const StyleInfoOwner = styled(Text)`
  color: ${({ theme }) => theme.palette.gray[600]};
  font-weight: 500;
  white-space: nowrap;
  font-size: 13px;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    font-size: 12px;
  }
`;
export const StyledInfoImage = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  object-fit: cover;
`;

export const StyledSearchContentContainer = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 4px;
  align-items: center;
  padding: 8px 0px;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    padding: 8px 0px;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    gap: 4px;
  }
`;
export const StyledContentMain = styled.article`
  display: flex;
  flex: 1%;
  min-width: 0;
  gap: 8px;
  flex-direction: column;
  cursor: pointer;
`;
export const StyledContentTitleText = styled(Text)`
  display: inline-block;
  overflow-wrap: break-word;
  text-transform: uppercase;
  width: 500px;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    width: 150px;
  }
`;
export const StyledContentText = styled(Text)`
  display: inline-block;
  overflow-wrap: break-word;
  width: 500px;
  color: ${({ theme }) => theme.palette.gray[600]};
  font-weight: 500;
  font-size: 13px;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    width: 150px;
  }
`;
export const StyledContentExtra = styled.div`
  display: flex;
  flex: 1%;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
`;
export const StyledCountPreviewText = styled(Text)`
  font-weight: 700;
  padding: 8px 16px;
  white-space: nowrap;
  cursor: pointer;
  width: 60px;
  text-align: end;
  font-style: italic;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    padding: 8px 0px;
    width: 26px;
  }
`;
export const StyledSearchProjectIcon = styled(FaBriefcase).attrs({
  fontSize: 14,
  //   color: defaultTheme.theme.palette.status.completed,
})``;
export const StyledSearchBugIcon = styled(FaBug).attrs({
  fontSize: 14,
})``;
export const StyledEventIcon = styled(MdEvent).attrs({
  size: 16,
})``;
