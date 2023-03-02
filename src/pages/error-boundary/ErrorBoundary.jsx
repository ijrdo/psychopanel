import React from "react";
import "./style.css";

const ErrorBoundary = ({ onClick }) => {
  return (
    <div className="error-boundary">
      <h2>OOPS!</h2>
      <h2>Something Went Wrong</h2>
      <button onClick={onClick}>Retry</button>
    </div>
  );
};
export default ErrorBoundary;
