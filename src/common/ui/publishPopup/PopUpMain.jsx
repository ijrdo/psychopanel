import { usePanelData } from "app-manager/panel-context/PanelProvider";
import React from "react";
import ResponsePopup from "../responsePopup/ResponsePopUp";
import PublishPopup from "./PublishPopup";

export default function PopUpMain({ show, article }) {
  const { state, dispatch } = usePanelData();
  const { popupResponse } = state;
  const close = () => {
    show((prev) => !prev);
    dispatch({ type: "SET_POPUP_STATE", payload: 0 });
    dispatch({ type: "RESET_VOLUME_SELECTION" });
  };
  return (
    <>
      <div className="overlay" onClick={close}></div>
      <div id="publish_popup">
        <PublishPopup article={article} show={show} />
      </div>

      {popupResponse && (
        <div className="popupResponse">
          <ResponsePopup show={show} />
        </div>
      )}
    </>
  );
}
