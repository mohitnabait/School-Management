import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Auth0ProviderWithNavigate } from "./lib/auth.tsx";
import { TempoDevtools } from "tempo-devtools";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { Toast } from "./components/common/Toast";
import { NeonThemeProvider } from "./components/theme/NeonThemeProvider";

// Initialize Tempo Devtools
TempoDevtools.init();

const basename = import.meta.env.BASE_URL;

// Add console logs for debugging
console.log("Starting application");
console.log("Environment:", import.meta.env);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename={basename}>
        <Auth0ProviderWithNavigate>
          <NeonThemeProvider>
            <Toast />
            <App />
          </NeonThemeProvider>
        </Auth0ProviderWithNavigate>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
