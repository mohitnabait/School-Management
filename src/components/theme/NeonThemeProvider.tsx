import React, { createContext, useContext, useState, useEffect } from "react";

type NeonColor = "purple" | "cyan" | "emerald" | "pink";

interface NeonThemeContextType {
  primaryColor: NeonColor;
  secondaryColor: NeonColor;
  setPrimaryColor: (color: NeonColor) => void;
  setSecondaryColor: (color: NeonColor) => void;
  applyNeonEffect: (element: string) => string;
}

const NeonThemeContext = createContext<NeonThemeContextType>({
  primaryColor: "purple",
  secondaryColor: "cyan",
  setPrimaryColor: () => {},
  setSecondaryColor: () => {},
  applyNeonEffect: () => "",
});

export const useNeonTheme = () => useContext(NeonThemeContext);

interface NeonThemeProviderProps {
  children: React.ReactNode;
}

export const NeonThemeProvider: React.FC<NeonThemeProviderProps> = ({
  children,
}) => {
  const [primaryColor, setPrimaryColor] = useState<NeonColor>("purple");
  const [secondaryColor, setSecondaryColor] = useState<NeonColor>("cyan");

  // Apply neon effect to an element
  const applyNeonEffect = (element: string): string => {
    const colorMap = {
      purple: "from-purple-500 to-purple-300",
      cyan: "from-cyan-500 to-cyan-300",
      emerald: "from-emerald-500 to-emerald-300",
      pink: "from-pink-500 to-pink-300",
    };

    return `${element} bg-gradient-to-r ${colorMap[primaryColor]} bg-clip-text text-transparent`;
  };

  // Apply global theme changes
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--primary-color",
      primaryColor === "purple"
        ? "#9333ea"
        : primaryColor === "cyan"
          ? "#06b6d4"
          : primaryColor === "emerald"
            ? "#10b981"
            : "#ec4899",
    );

    document.documentElement.style.setProperty(
      "--secondary-color",
      secondaryColor === "purple"
        ? "#9333ea"
        : secondaryColor === "cyan"
          ? "#06b6d4"
          : secondaryColor === "emerald"
            ? "#10b981"
            : "#ec4899",
    );
  }, [primaryColor, secondaryColor]);

  return (
    <NeonThemeContext.Provider
      value={{
        primaryColor,
        secondaryColor,
        setPrimaryColor,
        setSecondaryColor,
        applyNeonEffect,
      }}
    >
      {children}
    </NeonThemeContext.Provider>
  );
};
