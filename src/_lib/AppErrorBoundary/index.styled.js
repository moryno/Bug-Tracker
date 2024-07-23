import ContainerButton from "_lib/ContainerButton";
import styled from "styled-components";

export const StyledAppBoundary = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  flex: 1;

  & svg {
    fill: ${({ theme }) => theme.palette.primary.main};
    width: 100%;
    max-width: 400px;
  }
`;

export const StyledContainerButton = styled(ContainerButton)`
  margin-top: 10px;
`;
