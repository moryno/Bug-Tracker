import { Layout, Typography } from "antd";
import { styled } from "styled-components";

const { Sider } = Layout;

export const StyledAppSider = styled(Sider)``;

// export const StyledAppSidebarScrollbar = styled(AppScrollbar)`
//   height: 100vh;
//   @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
//     height: 100svh;
//   }
// `;

export const StyledAppSiderContainer = styled.section`
  .ant-layout-sider-light {
    background: ${({ theme }) => theme.palette.gray[50]};
    border-right: 1px solid
      ${({ theme }) => theme.palette.grey["Cool Grey"][200]};
  }
`;
export const StyleSidebarLogoContainer = styled.div`
  padding: 16px 16px 0px 16px;
  cursor: pointer;
`;
export const StyleSidebarLogo = styled.h2`
  font-size: 32px;
`;
