import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

export const Toast = () => {
  return <Toaster />;
};

export const useCustomToast = () => {
  const { toast } = useToast();

  const showSuccess = (message: string) => {
    toast({
      title: "Success",
      description: message,
      className: "bg-green-500/10 border-green-500/20 text-green-400",
    });
  };

  const showError = (message: string) => {
    toast({
      title: "Error",
      description: message,
      className: "bg-red-500/10 border-red-500/20 text-red-400",
    });
  };

  return { showSuccess, showError };
};
