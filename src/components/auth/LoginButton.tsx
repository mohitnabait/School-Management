import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    try {
      console.log("Login button clicked");
      await loginWithRedirect({
        authorizationParams: {
          redirect_uri: window.location.origin,
          audience: "https://dev-yvwz7kpo4hf8zxlc.us.auth0.com/api/v2/",
          scope: "openid profile email offline_access",
        },
        appState: {
          returnTo: "/dashboard",
        },
      });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Button
      onClick={handleLogin}
      className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
    >
      <LogIn className="mr-2 h-4 w-4" />
      Login
    </Button>
  );
};
