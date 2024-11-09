import { BrowserRouter } from "react-router-dom";
import { AppThemeProvider } from "_context";
import { AuthRoutes } from "_lib";
import { AppLayout } from "_core";
import { Provider } from "react-redux";
import { persistor, store } from "_redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import "@fontsource/inter"; 
import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";

function App() {
  const queryClient = new QueryClient();
  

  return (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
     <AppThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthRoutes>
            <AppLayout />
          </AuthRoutes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
     </AppThemeProvider>
    </PersistGate>
  </Provider>
  );
}

export default App;
