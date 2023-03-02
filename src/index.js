import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthProvider from "app-manager/auth/AuthProvider";
import PanelProvider from "app-manager/panel-context/PanelProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <PanelProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PanelProvider>
  </AuthProvider>
);
