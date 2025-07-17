"use client";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="rounded bg-gray-200 px-4 py-2 dark:bg-gray-700"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      Toggle to {theme === "dark" ? "light" : "dark"} mode
    </button>
  );
}
