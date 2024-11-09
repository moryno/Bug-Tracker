import { FaExternalLinkAlt } from "react-icons/fa";
import { FaClockRotateLeft, FaLocationDot } from "react-icons/fa6";
import { IoMdPeople } from "react-icons/io";
import { MdEvent } from "react-icons/md";
import styled from "styled-components";

export const StyledNotificationDetailContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 70vh;
  overflow-y: auto;
`;
export const StyledNotificationDetailTitle = styled.span`
  font-size: 14px;
  font-weight: 500;
  padding: 2px 0;
`;
export const StyledNotificationDetailText = styled.span`
  font-weight: 500;
  font-size: 15px;
`;
export const StyledNotificationDetailSpan = styled.span`
  color: ${({ theme }) => theme.palette.primary.main};
`;
export const StyledNotificationDetailWrapper = styled.section``;
export const StyledNotificationDetailHeader = styled.article`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const StyledNotificationInfoDiv = styled.div`
  display: flex;
  gap: 10px;
  width: 90%;
`;
export const StyledNotificationCalendarDiv = styled.div`
  flex: 12;
  display: flex;
  gap: 10px;
  margin: 0;
  padding: 0 30px;
  box-sizing: border-box;
`;
export const StyledNotificationRedirect = styled(FaExternalLinkAlt)`
  color: ${({ theme }) => theme.palette.primary.main};
  margin-top: 5px;
  cursor: pointer;
`;
export const StyledEventDetailInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 5px 0;
`;
export const StyledNotificationEventTitle = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 500;
  font-size: 16px;
`;
export const StyledEventText = styled.span`
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const StyledEventClock = styled(FaClockRotateLeft)`
  color: ${({ theme }) => theme.palette.primary.main};
`;
export const StyledEventLocation = styled(FaLocationDot)`
  color: ${({ theme }) => theme.palette.status.active};
`;
export const StyledEventAttendee = styled(IoMdPeople)``;
export const StyledEventIcon = styled(MdEvent).attrs({
  size: 18,
})`
  color: ${({ theme }) => theme.palette.status.completed};
`;

export const StyledAppNotificationWrapper = styled.article`
  height: 100%;
  overflow-y: auto;
  background-color: white;
`;
export const StyledAppDrawerTitleWrapper = styled.article`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const StyledAppDrawerText = styled.article`
  color: ${({ theme }) => theme.palette.primary.main};
  cursor: pointer;
`;
