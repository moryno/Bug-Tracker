import { ReactNode } from 'react'
import { Layout } from "antd";
import { styled } from "styled-components";

const MainSidebar = ({ children } : { children: ReactNode }) => {
  return (
    <SiderContainer>
      <Sider width={250} theme="light">
        {children}
      </Sider>
    </SiderContainer>
  )
};

const { Sider } = Layout;

export const SiderContainer = styled.div`
  .ant-layout-sider-light {
    background: ${({ theme }) => theme.palette.gray[50]};
    border-right: 1px solid ${({ theme }) => theme.palette.grey["Cool Grey"][200]};
  }
`;

export default MainSidebar