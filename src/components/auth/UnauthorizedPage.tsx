import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
      <h1 className="text-3xl font-bold text-white mb-2">Access Denied</h1>
      <p className="text-gray-400 mb-6 text-center">
        You don't have permission to access this page.
      </p>
      <Button onClick={() => navigate("/")} variant="outline">
        Return to Dashboard
      </Button>
    </div>
  );
};
