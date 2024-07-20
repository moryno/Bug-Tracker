import { defaultTheme } from "_constants";
import styled from "styled-components";

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
export const StyledInfoText = styled.p`
  padding: 0;
  margin: 0;
  font-weight: 500;
  font-size: 16px;
`;
