import styled from "styled-components";
import { FaHandsClapping } from "react-icons/fa6";
import { dashCardType, defaultTheme } from "_constants";
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
export const StyledHomeChartSections = styled.section``;
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
