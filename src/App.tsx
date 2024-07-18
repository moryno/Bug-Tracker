import { defaultTheme } from '_constants';
import { AppThemeProvider } from '_context';
import { Layout } from '_lib';
import { Button } from 'antd';
import React from 'react';


function App() {
  return (
    <AppThemeProvider>
     <Layout />
    </AppThemeProvider>
  );
}

export default App;
