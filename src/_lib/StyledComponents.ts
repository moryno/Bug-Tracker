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

export const PanelTitle = styled.h4`
  padding: 0;
  margin: 0;
  color: ${defaultTheme.theme.text};
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
  padding: 10px 16px;
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
