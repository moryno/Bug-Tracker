import { defaultTheme } from '_constants';
import { HashLoader } from 'react-spinners';
import styled from 'styled-components';

interface IProps{
    position?: string, 
    height?: string
}
const AppLoader = ({ position = "absolute", height="100%"}: IProps) => {
  return (
    <StyledAppLoader position={position} height={height} >
        <HashLoader color={defaultTheme.theme.palette.primary.main} size={40} />
    </StyledAppLoader>
  )
}

const StyledAppLoader = styled.div<IProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${({ theme, position, height }) =>
    position === "absolute"
      ? `calc(100vh - ${theme.header.heightWithMargin}px)`
      : height};
  position: ${({ position }) => position};
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    height: ${({ theme, position, height }) =>
      position === "absolute"
        ? `calc(100svh - ${
            theme.mobileMenu.height + theme.betSlip.collapseHeaderHeight
          }px)`
        : height};
  }
`;

export default AppLoader