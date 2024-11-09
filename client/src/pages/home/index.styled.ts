import styled from "styled-components";
import { FaHandsClapping } from "react-icons/fa6";
import { BsPersonCircle } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { dashCardType, defaultTheme } from "_constants";
import { FaBug } from "react-icons/fa";
interface StyledHomeCardProps {
  bg: string;
}

export const StyledUserAvatar = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
`;
export const StyledHandWave = styled(FaHandsClapping).attrs({
  size: "22px",
})`
  color: #fbc11e;
`;
export const StyledHomeContainer = styled.main`
  position: relative;
  padding-bottom: 60px;
`;
export const StyledHomeTopContainer = styled.section`
  background-color: #121927;
  color: ${defaultTheme.theme.palette.gray[300]};
  display: flex;
  padding: 30px 30px 60px;
`;

export const StyledHomeHeaderContainer = styled.section`
  display: flex;
  align-items: center;
`;
export const StyledHomeHeaderInfoContainer = styled.article`
  display: flex;
  gap: 20px;
`;
export const StyledHomeHeaderInfoWrapper = styled.div``;
export const StyledHomeHeaderInfoTitle = styled.h3`
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const StyledHomeHeaderWelcomeText = styled.p``;

export const StyledHomeBottomContainer = styled.section`
  position: absolute;
  top: 115px;
  left: 0;
  z-index: 7;
  display: flex;
  gap: 20px;
  flex-direction: column;
  width: 100%;
`;
export const StyledHomeChartSections = styled.section`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 20px;
`;
export const StyledHomeChartRightSections = styled.section`
  flex: 3;
  display: flex;
  align-items: center;
  gap: 20px;
`;
export const StyledHomeChartLeftSections = styled.section`
  flex: 2;
`;
export const StyledChartCardWrapper = styled.article`
  flex: 1;
  height: 320px;
  overflow-y: auto;
  background-color: white;
  padding: 16px;
  position: relative;
  border-radius: 8px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.06),
    0px 1px 3px 0px rgba(0, 0, 0, 0.1);
`;
export const StyledMiddleChartCardWrapper = styled.article`
  flex: 1;
  height: 400px;
  overflow-y: auto;
  background-color: white;
  padding: 16px 0;
  position: relative;
  border-radius: 8px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.06),
    0px 1px 3px 0px rgba(0, 0, 0, 0.1);
`;

export const StyledChartCardHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  // position: sticky;
  // top: 0;
  // left: 0;
`;
export const StyledChartCardHeaderTitle = styled.h1`
  font-size: 16px;
  margin: 0;
  padding: 0;
  color: ${defaultTheme.theme.palette.gray[900]};
`;
export const StyledChartCardHeaderImg = styled.img`
  height: 16px;
  width: 16px;
  cursor: pointer;
`;

export const StyledHomeCardContainers = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 20px;
`;
export const StyledHomeCard = styled.section<StyledHomeCardProps>`
  padding: 8px 16px;
  min-width: 19%;
  cursor: pointer;
  border-radius: 8px;
  background-color: ${({ bg }) =>
    bg === dashCardType.activeProjects
      ? "#08AEEA"
      : bg === dashCardType.completedProjects
      ? "#2CC8BA"
      : bg === dashCardType.openTickets
      ? "#4ED3E5"
      : bg === dashCardType.unassignedTickets
      ? "#74CB80"
      : "#EF476F"};
  color: ${defaultTheme.theme.palette.gray[100]};
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.06),
    0px 1px 3px 0px rgba(0, 0, 0, 0.1);
`;
export const StyledHomeCardDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const StyledHomeCardCount = styled.span`
  font-size: 22px;
  font-weight: 600;
`;
export const StyledHomeCardTitle = styled.span`
  font-size: 16px;
  font-weight: 500;
`;
export const StyledCardIcon = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
`;
export const StyledWorkItemWrapper = styled.article`
  display: flex;
  justify-content: space-between;
  padding: 12px 19px;
  cursor: pointer;
  border-bottom: 1px solid
    ${({ theme }) => theme.palette.grey["Cool Grey"][200]};
  &:hover {
    background-color: ${({ theme }) => theme.palette.grey["Cool Grey"][200]};
  }
  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.palette.grey["Cool Grey"][100]};
  }
`;
export const StyledWorkItemLeftDiv = styled.div`
  display: flex;
  gap: 10px;
`;
export const StyledWorkItemRightDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const StyledWorkItemInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
export const StyledWorkItemInfoTitle = styled.span`
  font-size: 13px;
  font-weight: 600;
`;
export const StyledWorkItemInfoDesc = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${defaultTheme.theme.palette.gray[500]};
`;
export const StyledWorkItemDueDate = styled.span`
  font-size: 13px;
`;
export const StyledWorkItemBugIcon = styled(FaBug).attrs({
  fontSize: 14,
  color: defaultTheme.theme.palette.status.completed,
})``;
export const StyledWorkItemMailIcon = styled(CiMail).attrs({
  fontSize: 22,
  color: defaultTheme.theme.palette.status.approved,
})`
  cursor: pointer;
`;
export const StyledWorkItemProfileIcon = styled(BsPersonCircle).attrs({
  fontSize: 22,
  color: defaultTheme.theme.palette.status.active,
})``;
export const StyledNotificationContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const StyledNotificationWrapper = styled.div<StyledHomeCardProps>`
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  background-color: ${({ bg }) =>
    bg === "0"
      ? "#edf9fd"
      : bg === "1"
      ? "#f1f0ff"
      : bg === "2"
      ? "#fefce8"
      : bg === "3"
      ? "#F4F6F9"
      : bg === "4"
      ? "#ffe4e6"
      : bg === "5"
      ? "#bae6fd"
      : bg === "6"
      ? "#dbeafe"
      : bg === "7"
      ? "#CAF7E6"
      : bg === "8"
      ? "#f3e8ff"
      : bg === "9"
      ? "#fce7f3"
      : bg === "10"
      ? "#e0e7ff"
      : "#F0FDF4"};
`;
export const StyledNotificationHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const StyledNotificationHeaderTitle = styled.div`
  font-weight: 500;
`;
export const StyledNotificationHeaderDate = styled.div`
  font-size: 12px;
  color: ${defaultTheme.theme.palette.gray[400]};
  background-color: white;
  border-radius: 8px;
  padding: 4px;
`;
export const StyledNotificationDescription = styled.p`
  font-size: 12px;
  color: ${defaultTheme.theme.palette.gray[400]};
  margin-top: 4px;
`;
