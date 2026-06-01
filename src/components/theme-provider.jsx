import { createContext, useContext, useEffect, useState } from "react";

const THEME_STORAGE_KEY = "importsgr-theme";

const initialState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext(initialState);

const getStoredTheme = () => {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "light" || stored === "dark" || stored === "system" ? stored : null;
  } catch {
    return null;
  }
};

const setStoredTheme = (nextTheme) => {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  } catch {
    // ignore write errors
  }
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
  ...props
}) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === "undefined") {
      return defaultTheme;
    }
    return getStoredTheme() || defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    const applyTheme = () => {
      root.classList.remove("light", "dark");

      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(theme === "system" ? systemTheme : theme);
    };

    applyTheme();
    setStoredTheme(theme);

    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", applyTheme);

    return () => mediaQuery.removeEventListener("change", applyTheme);
  }, [theme]);

  const setTheme = (nextTheme) => {
    setThemeState(nextTheme);
  };

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
