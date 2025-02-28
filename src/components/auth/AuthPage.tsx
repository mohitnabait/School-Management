import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth0 } from "@auth0/auth0-react";
import { useCustomToast } from "../common/Toast";
import { AlertCircle, Mail, Github, Facebook } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [email, setEmail] = useState("admin@test.com");
  const [password, setPassword] = useState("admin1234");
  const [error, setError] = useState<string | null>(null);
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const { showError, showSuccess } = useCustomToast();
  const navigate = useNavigate();

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      console.log("User already authenticated, redirecting to dashboard");
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleEmailAuth = async (e: React.FormEvent, isSignUp: boolean) => {
    e.preventDefault();
    try {
      console.log(
        `Attempting to ${isSignUp ? "signup" : "login"} with email: ${email}`,
      );
      await loginWithRedirect({
        authorizationParams: {
          redirect_uri: window.location.origin,
          // For demo, we're using the email/password directly
          // In a real app, you'd use Auth0's login page
          login_hint: email,
        },
        appState: {
          returnTo: "/dashboard",
        },
      });
      showSuccess("Authentication successful");
    } catch (error) {
      console.error("Auth error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Authentication failed";
      showError(errorMessage);
      setError(errorMessage);
    }
  };

  const handleSocialAuth = async (provider: string) => {
    try {
      console.log(`Attempting social login with provider: ${provider}`);
      await loginWithRedirect({
        authorizationParams: {
          connection: provider,
          redirect_uri: window.location.origin,
        },
        appState: {
          returnTo: "/dashboard",
        },
      });
    } catch (error) {
      console.error("Social auth error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Authentication failed";
      showError(errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-cyan-500/20 to-emerald-500/20 opacity-50" />

      <Card className="w-full max-w-md relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-purple-500/30">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-cyan-500/10 to-emerald-500/10" />

        <div className="relative p-6">
          <Tabs defaultValue="signin" className="space-y-6">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {error && (
              <Alert
                variant="destructive"
                className="mb-4 bg-red-500/10 border-red-500/20"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <TabsContent value="signin">
              <form
                onSubmit={(e) => handleEmailAuth(e, false)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/5 border-white/10 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/5 border-white/10 text-white"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                >
                  Sign In
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form
                onSubmit={(e) => handleEmailAuth(e, true)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/5 border-white/10 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/5 border-white/10 text-white"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                >
                  Sign Up
                </Button>
              </form>
            </TabsContent>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-black px-2 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                className="border-white/10 hover:bg-white/5"
                onClick={() => handleSocialAuth("google-oauth2")}
              >
                <Mail className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                className="border-white/10 hover:bg-white/5"
                onClick={() => handleSocialAuth("github")}
              >
                <Github className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                className="border-white/10 hover:bg-white/5"
                onClick={() => handleSocialAuth("facebook")}
              >
                <Facebook className="w-4 h-4" />
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                For demo purposes, use: <br />
                <span className="text-cyan-400">
                  admin@test.com / admin1234
                </span>
              </p>
            </div>
          </Tabs>
        </div>
      </Card>
    </div>
  );
};

export default AuthPage;
