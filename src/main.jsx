import { Toaster } from "react-hot-toast";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/variables.css";
import "./styles/global.css";
import "./styles/home.css";
import "./styles/auth.css";
import "./styles/dashboard.css";
import "./styles/meeting-details.css";
import "./styles/responsive.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
  <App />

  <Toaster
    position="top-right"
    toastOptions={{
      duration: 3500,
    }}
  />
</BrowserRouter>
  </StrictMode>
);
