import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppThemeProvider } from "_context";
import { AuthRoutes } from "_lib";
import { AppLayout } from "_core";

function App() {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <AuthRoutes>
          <AppLayout />
        </AuthRoutes>
      </BrowserRouter>
    </AppThemeProvider>
  );
}

export default App;
