

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import AppContextProvider from "./Context/AppContext";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
  <AppContextProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </AppContextProvider>
  </BrowserRouter>
);

reportWebVitals();