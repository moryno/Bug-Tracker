import React, { ReactNode } from "react";
import { StyledDetailPageCardWrapper, StyledPageCard } from "_lib";

interface IProps{
    children: ReactNode;
}

const DetailPage:React.FC<IProps> = ({ children }) => {

  return (
    <StyledPageCard>
      <StyledDetailPageCardWrapper>
       { children }
      </StyledDetailPageCardWrapper>
    </StyledPageCard>
  );
};

export default DetailPage;
