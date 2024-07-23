import SimpleBarReact from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import styled from "styled-components";

const AppScrollbar = (props: any) => {
    const { children, className, ...rest } = props;
    return (
      <StyledScrollbar className={className} {...rest}>
        {children}
      </StyledScrollbar>
    );
  };
  
  export const StyledScrollbar = styled(SimpleBarReact)`
  position: relative;
  width: 100%;
  height: 100%;

  & .simplebar-offset,
  & .simplebar-content-wrapper,
  & .simplebar-content {
    height: auto;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .simplebar-track.simplebar-vertical {
    width: 8px;
  }
  .simplebar-track.simplebar-horizontal {
    height: 8px;
  }
`;

export default AppScrollbar;