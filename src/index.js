import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import AuthProvider from "app-manager/auth/AuthProvider";
import PanelProvider from "app-manager/panel-context/PanelProvider";
import QueryProvider from "app-manager/query/QueryProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <PanelProvider>
      <QueryProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </QueryProvider>
    </PanelProvider>
  </AuthProvider>
);
