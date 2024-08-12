import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppThemeProvider } from "_context";
import { AuthRoutes } from "_lib";
import { AppLayout } from "_core";
import { Provider } from "react-redux";
import { persistor, store } from "_redux";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <AppThemeProvider>
      <BrowserRouter>
        <AuthRoutes>
          <AppLayout />
        </AuthRoutes>
      </BrowserRouter>
    </AppThemeProvider>
    </PersistGate>
  </Provider>
  );
}

export default App;
