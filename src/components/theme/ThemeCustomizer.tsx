import React from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useNeonTheme } from "./NeonThemeProvider";

interface ThemeCustomizerProps {
  isDarkMode?: boolean;
  onDarkModeChange?: (enabled: boolean) => void;
}

const ThemeCustomizer = ({
  isDarkMode = true,
  onDarkModeChange = () => {},
}: ThemeCustomizerProps) => {
  const { primaryColor, secondaryColor, setPrimaryColor, setSecondaryColor } =
    useNeonTheme();

  return (
    <Card className="w-80 p-6 bg-background/80 backdrop-blur-sm border-2 border-primary/20">
      <h3 className="text-lg font-semibold mb-4">Theme Customization</h3>

      <div className="space-y-6">
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Dark Mode</Label>
            <div className="text-sm text-muted-foreground">
              Toggle dark/light theme
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Switch checked={isDarkMode} onCheckedChange={onDarkModeChange} />
            <Moon className="h-4 w-4" />
          </div>
        </div>

        {/* Primary Color Selection */}
        <div className="space-y-2">
          <Label>Primary Color</Label>
          <RadioGroup
            value={primaryColor}
            onValueChange={(value) => setPrimaryColor(value as any)}
            className="grid grid-cols-4 gap-2"
          >
            {[
              { value: "purple", label: "Purple", class: "bg-purple-500" },
              { value: "cyan", label: "Cyan", class: "bg-cyan-500" },
              { value: "emerald", label: "Emerald", class: "bg-emerald-500" },
              { value: "pink", label: "Pink", class: "bg-pink-500" },
            ].map((color) => (
              <div key={color.value} className="text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative inline-block"
                >
                  <RadioGroupItem
                    value={color.value}
                    id={`primary-${color.value}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`primary-${color.value}`}
                    className="block cursor-pointer rounded-lg p-2 hover:opacity-80 peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-primary"
                  >
                    <div
                      className={`h-8 w-full rounded-md ${color.class} opacity-80`}
                    />
                  </Label>
                </motion.div>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Secondary Color Selection */}
        <div className="space-y-2">
          <Label>Secondary Color</Label>
          <RadioGroup
            value={secondaryColor}
            onValueChange={(value) => setSecondaryColor(value as any)}
            className="grid grid-cols-4 gap-2"
          >
            {[
              { value: "cyan", label: "Cyan", class: "bg-cyan-500" },
              { value: "purple", label: "Purple", class: "bg-purple-500" },
              { value: "emerald", label: "Emerald", class: "bg-emerald-500" },
              { value: "pink", label: "Pink", class: "bg-pink-500" },
            ].map((color) => (
              <div key={color.value} className="text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative inline-block"
                >
                  <RadioGroupItem
                    value={color.value}
                    id={`secondary-${color.value}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`secondary-${color.value}`}
                    className="block cursor-pointer rounded-lg p-2 hover:opacity-80 peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-primary"
                  >
                    <div
                      className={`h-8 w-full rounded-md ${color.class} opacity-80`}
                    />
                  </Label>
                </motion.div>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </Card>
  );
};

export default ThemeCustomizer;
