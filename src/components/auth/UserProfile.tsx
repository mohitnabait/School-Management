import { useAuth0 } from "@auth0/auth0-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export const UserProfile = () => {
  const { user, logout } = useAuth0();

  return (
    <Card className="p-6 bg-black/40 backdrop-blur-sm border-2 border-purple-500/30">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={user?.picture} />
          <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">{user?.name}</h3>
          <p className="text-sm text-gray-400">{user?.email}</p>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => logout()}
          className="text-red-400 hover:text-red-500"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};
