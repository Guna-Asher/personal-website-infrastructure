"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function readInitialTheme(): Theme {
  if (typeof document === "undefined") return "light";
  // Prefer the DOM attribute the inline init script already set (avoids a
  // flash by matching what was painted first) — but fall back to the same
  // resolution the script uses, since some rendering paths (e.g. notFound()
  // thrown from a nested dynamic segment) can skip that inline script.
  const fromDom = document.documentElement.getAttribute("data-theme");
  if (fromDom === "light" || fromDom === "dark") return fromDom;
  try {
    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* localStorage can throw in a private window — fall through to the OS. */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
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

  // Follow the OS while the visitor hasn't made an explicit choice. Once
  // they click the toggle, `theme` is stored and this stops applying.
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");

    const onChange = (event: MediaQueryListEvent) => {
      try {
        if (window.localStorage.getItem("theme")) return;
      } catch {
        return;
      }
      const next: Theme = event.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      setTheme(next);
    };

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      try {
        window.localStorage.setItem("theme", next);
      } catch {
        /* Not being able to persist the choice shouldn't break the toggle. */
      }
      return next;
    });
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}

/**
 * Runs before first paint. Resolves the theme (stored choice first, then the
 * OS — light is the identity, so an unset visitor on a light OS gets light),
 * and marks that JS is alive so the CSS reveal states are safe to apply.
 */
export const themeInitScript = `
(function () {
  var root = document.documentElement;
  root.setAttribute('data-js', 'on');
  var theme = 'light';
  try {
    var stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      theme = stored;
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme = 'dark';
    }
  } catch (e) {
    theme = 'light';
  }
  root.setAttribute('data-theme', theme);
})();
`;
