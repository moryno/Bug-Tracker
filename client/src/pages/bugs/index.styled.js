import styled from "styled-components";
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

export const StyledNameText = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${defaultTheme.theme.palette.gray[500]};
`;
export const StyledBugStatusTitle = styled.h3`
  padding: 0;
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  padding: 0 18px;
  color: ${defaultTheme.theme.palette.gray[500]};
`;
export const StyledBugStatusContainer = styled.article`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 16px;
`;
export const StyledBugStatusText = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${defaultTheme.theme.text};
`;
export const StyledAssigneeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const StyledAssigneeImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
`;

export const StyledAssigneeName = styled.span`
  font-size: 14px;
  color: #333;
`;
