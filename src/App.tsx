import { defaultTheme } from '_constants';
import { AppThemeProvider } from '_context';
import { Layout } from '_lib';
import { Button } from 'antd';
import { Bugs, ProjectDetail, Projects } from 'pages';
import React from 'react';


function App() {
  return (
    <AppThemeProvider>
     <Layout>
      <ProjectDetail />
     </Layout>
    </AppThemeProvider>
  );
}

export default App;
