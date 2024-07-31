import { Menu } from "antd";
import { styled } from "styled-components";

export const StyledVerticalNav = styled(Menu)`
  border-inline-end: none !important;
  background: ${({ theme }) => theme.palette.gray[50]};

  .ant-menu-submenu-open {
    color: ${({ theme }) => theme.palette.primary.main};
  }

  .ant-menu-inline {
    background: ${({ theme }) => theme.palette.gray[50]} !important;
    margin-left: 37px;
    border-left: 1px solid
      ${({ theme }) => theme.palette.grey["Cool Grey"][200]} !important;
  }
  .ant-menu-sub .ant-menu-item {
    padding: 8px 16px !important;
    margin-left: 16px;
    margin-bottom: 8px;
    height: 42px;
    width: fit-content;
    border-radius: 50px;
    color: ${({ theme }) => theme.palette.gray[900]};
    background: ${({ theme }) => theme.palette.white};
    border: 1px solid ${({ theme }) => theme.palette.grey["Cool Grey"][200]};
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.07);
  }
  .ant-menu-sub .ant-menu-item-selected {
    color: ${({ theme }) => theme.palette.green[700]};
    background: ${({ theme }) => theme.palette.secondary.main};
    border: 1px solid ${({ theme }) => theme.palette.green[600]};
    box-shadow: 0px 1px 2px ${({ theme }) => theme.palette.boxShadowColor};
  }
  .ant-menu-item {
    height: 50px;
    padding-left: 16px !important;
    font-weight: 500;
  }

  .ant-menu-item-group-title {
    font-weight: 600;
    font-size: 16px;
    color: ${({ theme }) => theme.palette.gray[500]};
  }
  .ant-menu-submenu-title {
    padding-left: 16px !important;
    font-weight: 500;
  }
`;
