import { createRoot } from "react-dom/client";
import App from "./components/App";
import { StrictMode } from "react";

import "sanitize.css";
import "sanitize.css/forms.css";
import "./styles/style.scss";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new TypeError("Root element not found.");
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
