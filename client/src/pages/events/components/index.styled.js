import { defaultTheme } from "_constants";
import { FaRegEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import styled from "styled-components";

export const StyledEventDetailContainer = styled.section``;
export const StyledEventDetailHeader = styled.section`
  display: flex;
`;
export const StyledEventDetailLeftWrapper = styled.section`
  flex: 7;
  display: flex;
  gap: 10px;
`;
export const StyledEventDetailRightWrapper = styled.section`
  flex: 1;
`;

export const StyledEventCalendarWrapper = styled.div`
  width: 18%;
  padding: 10px;
`;
export const StyledEventCalendar = styled.div`
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.06),
    0px 1px 3px 0px rgba(0, 0, 0, 0.1);
`;
export const StyledEventCalendarTop = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: #fff;
  font-weight: 500;
  padding: 2px 0 2px 4px;
  display: flex;
  align-items: center;
  gap: 15px;
`;
export const StyledEventCalendarTopMonth = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;

export const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;
export const StyledEventCalendarMonth = styled.span`
  font-size: 15px;
`;

export const StyledEventCalendarBottom = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 10px 0;
`;
export const StyledEventCalendarDate = styled.span`
  font-size: 20px;
`;
export const StyledEventCalendarYear = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.gray[500]};
`;

export const StyledEventDetailInfoWrapper = styled.div`
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
export const StyledEventTitle = styled.h2`
  font-size: 17px;
  margin: 0;
  padding: 0;
  color: ${defaultTheme.theme.palette.gray[900]};
`;
export const StyledEventText = styled.span`
  font-size: 16px;
  font-weight: 500;
`;
export const StyledEventCalendarRange = styled.span`
  font-size: 15px;
  color: ${({ theme }) => theme.palette.gray[500]};
`;
export const StyledEventEditIcon = styled(FaRegEdit).attrs({
  fontSize: 22,
  color: defaultTheme.theme.palette.status.onHold,
})`
  cursor: pointer;
`;

export const StyledEventDeleteIcon = styled(MdDelete).attrs({
  fontSize: 18,
  color: defaultTheme.theme.palette.status.team,
})`
  cursor: pointer;
`;
export const StyledEventCloseIcon = styled(IoClose).attrs({
  fontSize: 20,
})`
  cursor: pointer;
`;
