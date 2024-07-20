import styled from "styled-components";
import { Col, Progress } from "antd";
import { MdOutlineMessage } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { defaultTheme } from "_constants";

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
export const StyledComment = styled(MdOutlineMessage).attrs({
  fontSize: 16,
})``;
export const StyledInfo = styled(FaInfoCircle).attrs({
  fontSize: 16,
})``;
export const StyledTitle = styled.h3`
  padding: 0;
  margin: 0;
`;
export const PanelTitle = styled.h4`
  padding: 0;
  margin: 0;
`;
export const StyledTitleContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const StyledTagContainer = styled.article`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const StyledInfoDivContainer = styled(Col).attrs({
  width: "100%",
})`
  padding: 10px 0;
  border-bottom: 0.5px solid ${defaultTheme.theme.palette.gray[100]};
`;

export const StyledInfoDivWrapper = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;
export const StyledInfoLabel = styled.h3`
  padding: 0;
  margin: 0;
  font-weight: 500;
`;

export const StyledUserWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
