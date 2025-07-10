import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";
import { store } from "./app/store";
import router from "./routes/route";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
      <Toaster></Toaster>
    </Provider>
  </StrictMode>
);
