import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth0 } from "@auth0/auth0-react";
import { useCustomToast } from "../common/Toast";
import {
  AlertCircle,
  Mail,
  Github,
  Facebook,
  Lock,
  User,
  ArrowRight,
  GraduationCap,
  BarChart,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

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
      navigate("/dashboard", { replace: true });
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
          audience: "https://dev-yvwz7kpo4hf8zxlc.us.auth0.com/api/v2/",
          scope: "openid profile email offline_access",
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
          audience: "https://dev-yvwz7kpo4hf8zxlc.us.auth0.com/api/v2/",
          scope: "openid profile email offline_access",
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

  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess(`Password reset link sent to ${resetEmail}`);
    setForgotPassword(false);
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-cyan-500/20 to-emerald-500/20 opacity-50" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c')] bg-cover bg-center opacity-10" />

      <div className="w-full max-w-5xl flex flex-col md:flex-row overflow-hidden rounded-xl">
        {/* Left side - Branding */}
        <div className="hidden md:block md:w-2/5 bg-gradient-to-br from-purple-600 via-cyan-600 to-emerald-600 p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">
                School Management System
              </h1>
              <p className="text-white/80 mb-8">
                Streamline your school's operations with our comprehensive
                management solution
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">Student Management</p>
                  <p className="text-white/70 text-sm">
                    Track progress and attendance
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">Teacher Portal</p>
                  <p className="text-white/70 text-sm">
                    Manage classes and grades
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <BarChart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">Admin Dashboard</p>
                  <p className="text-white/70 text-sm">
                    Complete school oversight
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Auth forms */}
        <Card className="md:w-3/5 relative overflow-hidden bg-black/80 backdrop-blur-sm border-0 md:border-l-0 rounded-none md:rounded-r-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-cyan-500/10 to-emerald-500/10" />

          <div className="relative p-8 md:p-12">
            {forgotPassword ? (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Reset Password
                  </h2>
                  <p className="text-gray-400">
                    Enter your email to receive a password reset link
                  </p>
                </div>

                {error && (
                  <Alert
                    variant="destructive"
                    className="bg-red-500/10 border-red-500/20"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="reset-email"
                        type="email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className="bg-white/5 border-white/10 text-white pl-10"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-3">
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                    >
                      Send Reset Link
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      className="text-gray-400 hover:text-white"
                      onClick={() => setForgotPassword(false)}
                    >
                      Back to Login
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <Tabs defaultValue="signin" className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Welcome Back
                    </h2>
                    <p className="text-gray-400">
                      Sign in to access your account
                    </p>
                  </div>
                  <TabsList className="grid grid-cols-2">
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>
                </div>

                {error && (
                  <Alert
                    variant="destructive"
                    className="bg-red-500/10 border-red-500/20"
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
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-white/5 border-white/10 text-white pl-10"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="password">Password</Label>
                        <Button
                          variant="link"
                          className="text-xs text-cyan-400 p-0 h-auto"
                          onClick={() => setForgotPassword(true)}
                        >
                          Forgot password?
                        </Button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="bg-white/5 border-white/10 text-white pl-10"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white h-11"
                    >
                      Sign In <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form
                    onSubmit={(e) => handleEmailAuth(e, true)}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-name"
                          type="text"
                          className="bg-white/5 border-white/10 text-white pl-10"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-white/5 border-white/10 text-white pl-10"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="bg-white/5 border-white/10 text-white pl-10"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white h-11"
                    >
                      Create Account <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </TabsContent>

                <div className="relative my-6">
                  <Separator className="bg-white/10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-black/80 px-2 text-gray-400 text-sm">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    className="border-white/10 hover:bg-white/5 h-11"
                    onClick={() => handleSocialAuth("google-oauth2")}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/10 hover:bg-white/5 h-11"
                    onClick={() => handleSocialAuth("github")}
                  >
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/10 hover:bg-white/5 h-11"
                    onClick={() => handleSocialAuth("facebook")}
                  >
                    <Facebook className="w-5 h-5 mr-2" />
                    Facebook
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
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
