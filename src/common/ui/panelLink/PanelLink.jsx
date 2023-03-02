import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export const PanelLink = ({ children, onClick, to }) => {
  return (
    <Link className="panel_link" onClick={onClick} to={to}>
      {children}
    </Link>
  );
};
