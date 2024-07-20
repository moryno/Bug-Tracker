import { Layout } from "antd";
import styled from "styled-components";

export const StyledAppLayout = styled(Layout)`
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
export const StyledAppLayoutMain = styled(Layout)`
  transition: all 0.1s linear;
  flex-shrink: 0;
  background-color: ${({ background }) => background}!important;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    top: ${({ theme }) => `${theme.header.height}px`};
    position: absolute;

    bottom: ${({ theme, is_mobile_bet_slip_available }) =>
      is_mobile_bet_slip_available === "true"
        ? `${theme.mobileMenu.height + theme.betSlip.collapseHeaderHeight}px`
        : `${theme.mobileMenu.height}px`};
    width: 100% !important;
    &.game-page {
      bottom: 0px;
    }
  }
`;
