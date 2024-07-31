import React, { memo, ReactNode } from 'react';
import { ConfigProvider } from "antd";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from '_constants';
import { getAntTheme } from '_helpers';


const AppThemeProvider = ({ children } : {children : ReactNode}) => {
    const theme = defaultTheme.theme;

  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider theme={{ token: getAntTheme(theme)}}>
        { children }
      </ConfigProvider>
    </ThemeProvider>
  )
}

export default memo(AppThemeProvider)