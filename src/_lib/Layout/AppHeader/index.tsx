import React from 'react'
import { 
  StyledAppHeader, 
  StyledAppHeaderLeft, 
  StyledAppHeaderPage, 
  StyledAppHeaderRight, 
  StyledAppHeaderToggleSidebar,
  StyledAppHeaderAvatar,
  StyledAppHeaderAdd,
  StyledAppHeaderSearch,
  StyledAppHeaderNotification
 } from './index.styled'

const AppHeader = () => {
  return (
    <StyledAppHeader>
      <StyledAppHeaderLeft>
        <StyledAppHeaderToggleSidebar />
        <StyledAppHeaderPage>Home</StyledAppHeaderPage>
      </StyledAppHeaderLeft>
      <StyledAppHeaderRight>
        <StyledAppHeaderAdd />
        <StyledAppHeaderSearch />
        <StyledAppHeaderNotification />
        <StyledAppHeaderAvatar src={"/img/noavatar.jpg"} />
      </StyledAppHeaderRight>
    </StyledAppHeader>
  )
}

export default AppHeader