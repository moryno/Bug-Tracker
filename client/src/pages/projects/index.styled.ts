import styled from "styled-components";
import { Progress } from "antd";
import { FaInfoCircle } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { defaultTheme } from "_constants";
import { CiEdit } from "react-icons/ci";
import { FaEllipsis } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

interface StyledProps {
  color: string;
}

export const StyledPageCard = styled.main`
  padding: 10px 16px;
`;
export const StyledPageCardWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const StyledTopContainer = styled.section``;
export const StyledTopWrapper = styled.section`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const StyledTopIconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;
export const StyleTopLeftWrapper = styled.section`
  display: flex;
  flex: 6;
  align-items: center;
  gap: 20px;
`;
export const StyleTopRightWrapper = styled.section`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  gap: 10px;
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
})<StyledProps>`
  color: ${({ theme, color }) => theme.palette.status[color]};
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
export const StyledDetailEditIcon = styled(CiEdit).attrs({
  fontSize: 20,
  color: defaultTheme.theme.palette.status.completed,
})`
  cursor: pointer;
`;
export const StyledDetailMoreIcon = styled(FaEllipsis).attrs({
  fontSize: 20,
  color: defaultTheme.theme.palette.primary.main,
})`
  cursor: pointer;
`;
export const StyledDetailCloseIcon = styled(IoClose).attrs({
  fontSize: 20,
  color: defaultTheme.theme.palette.status.cancelled,
})`
  cursor: pointer;
`;
export const StyledFormCheckboxWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;
`;

export const StyledFilterRightWrapper = styled.article`
  display: flex;
  padding: 10px 30px;
  align-items: center;
  justify-content: flex-end;
`;
