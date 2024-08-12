import { Form } from "antd";
import { styled } from "styled-components";

export const StyledAuthContainerMain = styled.div`
  left: 0px;
  right: 0px;
  width: 400px;
  margin: auto;
  padding: 10px 32px 32px;
  border-radius: 5px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.06),
    0px 1px 3px 0px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    width: 100%;
  }
`;
export const StyledAuthContainerContent = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const StyledAuthContainerForm = styled(Form)``;
export const StyledAuthFormTitle = styled.h3`
  color: ${({ theme }) => theme.palette.primary.accentColor};
  font-size: 24px;
`;

export const StyledRedirectButton = styled.span`
  color: ${({ theme }) => theme.palette.primary.main};
  float: right;
  cursor: pointer;
`;
