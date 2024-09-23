import { defaultTheme } from "_constants";
import styled from "styled-components";

export const StyledProfileContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 60px;
`;
export const StyledProfileTitleContainer = styled.article`
  padding: 20px 0;
`;
export const StyledProfileInfoContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: ${defaultTheme.theme.palette.gray[500]};
`;

export const StyledProfileRoleText = styled.span`
  font-size: 14px;
  font-weight: 500;
`;
export const StyledProfileEmailText = styled.span`
  font-size: 13px;
  font-weight: 500;
  text-decoration: underline;
`;
export const StyledProfileDangerText = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${defaultTheme.theme.palette.status.team};
`;
export const StyledProfileHeaderInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;
export const StyledProfileHeaderInfoTitle = styled.h2`
  margin: 0;
  font-size: 22px;
  font-weight: 500;
  color: ${defaultTheme.theme.palette.gray[600]};
`;
export const StyledProfileAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;
export const StyledProfileMiddleContainer = styled.article`
  display: flex;
  align-items: center;
  gap: 20px;
`;
export const StyledProfileMiddleLeftContainer = styled.div`
  flex: 2;
`;
export const StyledProfileMiddleRightContainer = styled.div`
  flex: 1;
`;
export const StyledProfileChartTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 500;
  color: ${defaultTheme.theme.palette.gray[600]};
`;
export const StyledPerfomanceChartDetails = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;
export const RatingValue = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
`;

export const RatingDescription = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.palette.grey[300]};
`;
export const ProgressDetailContainer = styled.div`
  position: absolute;
  bottom: 4rem;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
`;
export const ProgressDetailWrapper = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;
`;

export const Circle = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  background-color: ${({ color }) =>
    color === "green" ? "#00C49F" : "#FFBB28"};
  border-radius: 50%;
`;

export const CountText = styled.h1`
  font-weight: 600;
`;

export const PercentageText = styled.h2`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.palette.grey[300] || "#d1d5db"};
`;
export const StyledTableTitle = styled.h2`
  padding: 16px;
  margin: 0;
  font-size: 20px;
  font-weight: 500;
  color: ${defaultTheme.theme.palette.gray[600]};
`;
