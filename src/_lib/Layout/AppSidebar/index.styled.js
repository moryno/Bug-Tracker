import AppScrollbar from "_lib/AppScrollbar";
import styled from "styled-components";

export const StyledAppSidebarScrollbar = styled(AppScrollbar)`
  height: 100vh;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    height: 100svh;
  }
`;
export const StyledLoginSidebarContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

export const StyleSidebarLogoContainer = styled.div`
  padding: 16px 16px 0px 16px;
  cursor: pointer;
`;
