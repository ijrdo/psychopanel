import React from "react";
import "./style.css";

export const PanelButton = ({ children, onClick, type, sending, disabled }) => {
  return (
    <button
      disabled={sending ? sending : false}
      type={type ? type : "button"}
      className={sending ? "load" : "panel_btn"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
