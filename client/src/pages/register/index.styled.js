import { defaultTheme } from "_constants";
import { GiPartyPopper } from "react-icons/gi";
import styled from "styled-components";
import { FaEnvelope } from "react-icons/fa";

export const StyledSuccessContainer = styled.main`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
export const StyledSuccessTitle = styled.h1`
  color: ${defaultTheme.theme.palette.primary.main};
`;
export const StyledSuccessText = styled.p`
  font-weight: 500;
  font-size: 15px;
  color: ${defaultTheme.theme.palette.gray[500]};
`;
export const StyledEnvelopIcon = styled(FaEnvelope).attrs({
  fontSize: 20,
})``;
export const StyledConfettiIcon = styled(GiPartyPopper).attrs({
  fontSize: 26,
})``;
