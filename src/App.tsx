import React from 'react';
import { AppThemeProvider } from '_context';
import { Layout } from '_lib';
import { ProjectDetail } from 'pages';


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
