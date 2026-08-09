import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { ThemeProvider } from "@/components/theme-provider";

createRoot(document.getElementById("root")!).render(
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <App />
    </ThemeProvider>
);

// Register Service Worker for PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .catch((err) => console.warn("SW registration failed:", err));
  });
}
