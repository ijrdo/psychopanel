import "./style.css";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import { PanelButton } from "common/ui/panelButton/PanelButton";
import { usePanelData } from "app-manager/panel-context/PanelProvider";
export default function FormResponse({ error, refetch }) {
  const { dispatch } = usePanelData();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const createAnother = () => {
    dispatch({ type: "SHOW_FORM_RESPONSE", payload: false });
  };
  const exitResponse = () => {
    dispatch({ type: "SHOW_FORM_RESPONSE", payload: false });
    if (!error) {
      return navigate("/panel/dashboard");
    }
  };
  if (error)
    return (
      <>
        <div className="backdrop"></div>
        <div className="Form-Response">
          <h2>Something went wrong</h2>
          <div className="form-response_btns">
            <PanelButton onClick={exitResponse}>Back</PanelButton>
            <PanelButton onClick={refetch}>Try Again</PanelButton>
          </div>
        </div>
      </>
    );
  return (
    <>
      <div className="backdrop"></div>
      <div className="Form-Response">
        <h2>
          Article {pathname.includes("add") ? "Created " : "Updated "}
          Successfully
        </h2>
        <div className="form-response_btns">
          <PanelButton onClick={exitResponse}>Back To Dashboard</PanelButton>
          {pathname.includes("add") && (
            <PanelButton onClick={createAnother}>
              Create Another Article
            </PanelButton>
          )}
        </div>
      </div>
    </>
  );
}
