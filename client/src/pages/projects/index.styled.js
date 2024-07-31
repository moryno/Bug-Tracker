import styled from "styled-components";
import { Progress } from "antd";
import { FaInfoCircle } from "react-icons/fa";
import { defaultTheme } from "_constants";
import { GoDotFill } from "react-icons/go";

export const StyledPageCard = styled.main`
  padding: 10px 16px;
`;
export const StyledPageCardWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const StyledTopContainer = styled.section`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
`;
export const StyledProgress = styled(Progress)``;

export const StyledInfo = styled(FaInfoCircle).attrs({
  fontSize: 16,
})``;

export const StyledTitleContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StyledStatusWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const StyledStatusDot = styled(GoDotFill).attrs({
  fontSize: 20,
  color: defaultTheme.theme.palette.status.active,
})``;
