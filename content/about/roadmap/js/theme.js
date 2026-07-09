/**
 * Theme toggle — dark / light mode.
 * Reads/writes localStorage key "openff-theme".
 * Apply early (before DOMContentLoaded) to avoid flash.
 */

const STORAGE_KEY = "openff-theme";

export function initTheme() {
  // Apply saved or system preference immediately
  const saved = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  applyTheme(theme);

  // Wire up the toggle button once DOM is ready
  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("theme-toggle");
    if (btn) {
      updateButton(btn, theme);
      btn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme") || "dark";
        const next = current === "dark" ? "light" : "dark";
        applyTheme(next);
        updateButton(btn, next);
        localStorage.setItem(STORAGE_KEY, next);
      });
    }
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

function updateButton(btn, theme) {
  const isDark = theme === "dark";
  btn.innerHTML = isDark
    ? `<span class="toggle-icon">☀️</span> Light mode`
    : `<span class="toggle-icon">🌙</span> Dark mode`;
  btn.title = isDark ? "Switch to light mode" : "Switch to dark mode";
}
