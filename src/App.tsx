import { defaultTheme } from '_constants';
import { AppThemeProvider } from '_context';
import { Layout } from '_lib';
import { Button } from 'antd';
import { Bugs, Projects } from 'pages';
import React from 'react';


function App() {
  return (
    <AppThemeProvider>
     <Layout>
      <Bugs />
     </Layout>
    </AppThemeProvider>
  );
}

export default App;
