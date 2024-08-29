import { defaultTheme } from "_constants";
import styled from "styled-components";
import { LuDot } from "react-icons/lu";
import { MdAttachFile } from "react-icons/md";
import { Col, Input } from "antd";
import { FaInfoCircle } from "react-icons/fa";
const { TextArea } = Input;

export const StyledPageCard = styled.main`
  ${"" /* padding: 10px 16px; */}
`;
export const StyledInfo = styled(FaInfoCircle).attrs({
  fontSize: 16,
})`
  cursor: pointer;
`;

export const StyledTopContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
export const StyledFilterContainer = styled.article`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const StyledButtonContainer = styled.article`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;
export const StyledBottomContainer = styled.section`
  padding: 20px 0;
`;
// COMMENT COMPONENT
export const StyledCommentContainer = styled.section`
  width: 100%;
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
`;
export const StyledCommentWrapper = styled.article`
  display: flex;
  flex-direction: column;
  width: 60%;
`;
export const StyledUserContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StyledDateContainer = styled.article`
  display: flex;
  align-items: center;
  gap: 5px;
`;
export const StyledDateText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${defaultTheme.theme.palette.gray[400]};
`;
export const StyledEditText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${defaultTheme.theme.palette.orange};
  cursor: pointer;
  visibility: hidden;
  ${StyledCommentContainer}:hover & {
    visibility: visible;
  }
`;
export const StyledDot = styled(LuDot).attrs({
  fontSize: 20,
  color: defaultTheme.theme.palette.gray[400],
})`
  visibility: hidden;
  ${StyledCommentContainer}:hover & {
    visibility: visible;
  }
`;
export const StyledAttachContainer = styled(Col)`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;
export const StyledCommentButtonContainer = styled(Col)`
  display: flex;
  gap: 20px;
  justify-content: flex-end;
`;
export const StyledAttachButton = styled(MdAttachFile)`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const StyledTextArea = styled(TextArea)`
  resize: none;
  width: 100%;
`;
