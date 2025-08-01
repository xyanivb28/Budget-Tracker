"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon } from "lucide-react";

export function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = React.useState(theme === "dark");

  React.useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);

  const handleToggle = (checked: boolean) => {
    setIsDarkMode(checked);
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="flex items-center gap-2 ps-2 transition-all duration-300 ease-in-out">
      <Sun className="h-4 w-4 transition-colors duration-300 ease-in-out" />
      <Switch
        id="theme-mode"
        checked={isDarkMode}
        onCheckedChange={handleToggle}
        className="cursor-pointer transition-all duration-300 ease-in-out"
      />
      <Moon className="h-4 w-4 transition-colors duration-300 ease-in-out" />
    </div>
  );
}
