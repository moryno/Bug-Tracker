import React, { ReactNode } from 'react'
import AppHeader from './AppHeader'
import AppSidebar from './AppSidebar'
import { StyledAppLayout } from './index.styled'

const Layout = ({ children } : { children: ReactNode}) => {
  return (
    <main>
      <AppHeader />
      { children }
    </main>
  )
}

export default Layout