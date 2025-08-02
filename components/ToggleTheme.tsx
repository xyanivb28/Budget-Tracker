"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon } from "lucide-react";

export function ToggleTheme() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = resolvedTheme === "dark";

  const handleToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  // Avoid rendering until mounted to prevent hydration mismatch
  if (!mounted) return null;

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
