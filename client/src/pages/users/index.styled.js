import { defaultTheme } from "_constants";
import styled from "styled-components";

export const StyledUserContainer = styled.main``;
export const StyledUserTitleWrapper = styled.section``;
export const StyledUserTitle = styled.h2`
  margin: 0;
  padding: 0;
  color: ${defaultTheme.theme.palette.gray[900]};
`;
export const StyledUserSubTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: ${defaultTheme.theme.palette.gray[500]};
`;
export const StyledUserFilterWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const StyledUserFilterLeftWrapper = styled.article``;
export const StyledUserTableTitle = styled.h3`
  margin: 0;
  padding: 0;
  color: ${defaultTheme.theme.palette.gray[900]};
`;
export const StyledUserFilterRightWrapper = styled.article``;
