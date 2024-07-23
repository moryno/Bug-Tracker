import AppScrollbar from "_lib/AppScrollbar";
import { Layout } from "antd";
import styled from "styled-components";
interface StyledProps {
  background: string;
}

export const StyledAppLayout = styled(Layout)<StyledProps>`
  width: 100%;
  height: 100%;
  position: fixed;
  overflow-x: hidden;
  overflow-y: hidden;
  background-color: ${({ background }) => background}!important;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    position: relative;
  }
`;
export const StyledAppLayoutMain = styled(Layout)<StyledProps>`
  transition: all 0.1s linear;
  flex-shrink: 0;
  background-color: ${({ background }) => background}!important;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    top: ${({ theme }) => `${theme.header.height}px`};
    position: absolute;
    bottom: ${({ theme }) => `${theme.mobileMenu.height}px`};
    width: 100% !important;
  }
`;
export const StyledAppLayoutScrollbar = styled(AppScrollbar)`
  height: ${({ theme }) => `calc(100vh - ${theme.header.heightWithMargin}px)`};
  overflow-x: hidden;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    height: 100%;
    width: 100%;
    top: 0;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    padding: 10px 16px;
    overflow-x: hidden;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xxs}px) {
    padding: 10px;
  }
`;
