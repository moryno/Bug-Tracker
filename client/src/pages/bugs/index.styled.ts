import styled from "styled-components";
import { defaultTheme } from "_constants";
import { GoDotFill } from "react-icons/go";
import { MdDelete } from "react-icons/md";

export const StyledPageCard = styled.main`
  padding: 10px 16px;
`;
export const StyledPageCardWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

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
  margin: 5px 0 0;
  font-size: 13px;
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
  font-size: 13px;
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
export const StyledBugChartCardWrapper = styled.article`
  width: 24%;
  height: 260px;
  overflow-y: auto;
  background-color: white;
  padding: 16px;
  position: relative;
  border-radius: 8px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.06),
    0px 1px 3px 0px rgba(0, 0, 0, 0.1);
`;
export const StyledGroupChartContainer = styled.section`
  display: flex;
  gap: 20px:
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 20px 0;
`;
export const StyledBugProgressWrapper = styled.div`
  display: flex;
  gap: 20px:
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;
export const StyledDetailMenuWrapper = styled.div`
  justify-self: end;
`;
export const StyledDeleteIcon = styled(MdDelete).attrs({
  fontSize: 18,
  color: defaultTheme.theme.palette.status.team,
})`
  cursor: pointer;
`;
