import React, {  useMemo } from 'react'
import AppHeader from './AppHeader'
import AppSidebar from './AppSidebar'
import { StyledAppLayout, StyledAppLayoutMain } from './index.styled'
import { defaultTheme, HOME_ROUTE } from '_constants'
import { useLocation } from 'react-router-dom'
import AppContentView from '_lib/AppContentView'

const Layout = ({ routes }: { routes: any}) => {
  const { pathname } = useLocation();

  const layoutBackground = useMemo(() => {
    let background = defaultTheme.theme.palette.background.paper;
    if (
      pathname !== HOME_ROUTE
    ) {
      background = defaultTheme.theme.palette.background.paperMobile;
    }
    return background;
  }, [pathname]);

  return (
    <StyledAppLayout background={layoutBackground}>
      <AppHeader />
      
      <StyledAppLayoutMain background={layoutBackground}>
        <AppSidebar />
        <AppContentView routes={routes} />
      </StyledAppLayoutMain>
    </StyledAppLayout>
  )
}

export default Layout