import React from 'react'
import { 
  StyledAppSider, 
  StyledAppSiderContainer, 
  StyleSidebarLogo, 
  StyleSidebarLogoContainer } from './index.styled'


const AppSidebar = () => {
  return (
    // <StyledAppSiderContainer>
    //   <StyledAppSider theme="light">
    //   <StyleSidebarLogoContainer>
    //     <StyleSidebarLogo>Bug Tracker</StyleSidebarLogo>
    //   </StyleSidebarLogoContainer>
    //   </StyledAppSider>
    // </StyledAppSiderContainer>
    <main style={{ width: "300px", height: "100vh"}}>
      <section style={{ width: "100%", height: "100%"}}>
        <h3>Bug Tracker</h3>
      </section>
    </main>
  )
}

export default AppSidebar