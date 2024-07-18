import { defaultTheme } from '_constants';
import { AppThemeProvider } from '_context';
import { Button } from 'antd';
import React from 'react';


function App() {
  return (
    <AppThemeProvider>
     <Button color={defaultTheme.theme.palette.secondary.main}>New Button</Button>
    </AppThemeProvider>
  );
}

export default App;
