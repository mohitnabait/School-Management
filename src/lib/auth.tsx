import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { Auth0ProviderWithNavigateProps } from "./auth";
import { useCustomToast } from "@/components/common/Toast";

export const Auth0ProviderWithNavigate = ({
  children,
}: Auth0ProviderWithNavigateProps) => {
  const navigate = useNavigate();
  const { showError } = useCustomToast();

  // Hardcoded values to ensure they're available
  const domain = "dev-yvwz7kpo4hf8zxlc.us.auth0.com";
  const clientId = "Gg7o2vWBQUQHFHWZE0YAH5D8vZjXuQKB";

  const onRedirectCallback = (appState: any) => {
    console.log("Auth0 redirect callback triggered", appState);
    navigate(appState?.returnTo || "/dashboard");
  };

  if (!domain || !clientId) {
    console.error("Auth0 configuration is missing");
    showError("Auth0 configuration is missing");
    return <>{children}</>;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      {children}
    </Auth0Provider>
  );
};
