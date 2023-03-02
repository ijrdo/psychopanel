import React from "react";
import { useNavigate } from "react-router";
import { PanelButton } from "common/ui/panelButton/PanelButton";
import "./style.css";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div id="error">
      <h1>404</h1>
      <h2>OOPS!</h2>
      <h2>Page Not Found</h2>
      <PanelButton onClick={() => navigate("/panel/dashboard")}>
        Back To Dashboard
      </PanelButton>
    </div>
  );
};
export default NotFound;
