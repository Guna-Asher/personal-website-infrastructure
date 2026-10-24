"use client";

import { Moon, Sun } from "@/components/ui/icons";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      suppressHydrationWarning
      className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-sm text-ink-muted transition-colors duration-150 hover:text-ink"
    >
      <Sun className="absolute h-4 w-4 scale-100 opacity-100 transition-all duration-200 [[data-theme=dark]_&]:scale-75 [[data-theme=dark]_&]:opacity-0" />
      <Moon className="absolute h-4 w-4 scale-75 opacity-0 transition-all duration-200 [[data-theme=dark]_&]:scale-100 [[data-theme=dark]_&]:opacity-100" />
    </button>
  );
}
