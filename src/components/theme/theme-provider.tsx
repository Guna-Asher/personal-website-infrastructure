"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function readInitialTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  // Prefer the DOM attribute the inline init script already set (avoids a
  // flash by matching what was painted first) — but fall back to
  // localStorage directly, since some rendering paths (e.g. notFound()
  // thrown from a nested dynamic segment) can skip that inline script.
  const fromDom = document.documentElement.getAttribute("data-theme");
  if (fromDom === "light" || fromDom === "dark") return fromDom;
  try {
    const stored = window.localStorage.getItem("theme");
    return stored === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

  // Self-heal: if the DOM attribute didn't end up matching the resolved
  // theme (the inline script didn't run on this rendering path), correct
  // it here so CSS and the toggle button's next click both stay accurate.
  useEffect(() => {
    if (document.documentElement.getAttribute("data-theme") !== theme) {
      document.documentElement.setAttribute("data-theme", theme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      window.localStorage.setItem("theme", next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}

export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'light' || stored === 'dark' ? stored : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;
