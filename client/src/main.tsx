import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";
import { store } from "./app/store";
import router from "./routes/route";
import { ThemeProvider } from "./providers/theme-provider";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <HelmetProvider>
        <Provider store={store}>
          <RouterProvider router={router}></RouterProvider>
          <Toaster position="top-right"></Toaster>
        </Provider>
      </HelmetProvider>
    </ThemeProvider>
  </StrictMode>
);
