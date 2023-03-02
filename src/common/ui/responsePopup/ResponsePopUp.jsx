import "./style.css";
import { useQueryClient } from "@tanstack/react-query";
import { PanelButton } from "../panelButton/PanelButton";
import { usePanelData } from "app-manager/panel-context/PanelProvider";

export default function ResponsePopup({ show, id }) {
  const queryClient = useQueryClient();

  const { state, dispatch } = usePanelData();
  const { responseText, invalidFile } = state;
  const closePopup = () => {
    if (show) {
      show(() => false);
      dispatch({ type: "SET_POPUP_STATE", payload: 0 });
      dispatch({ type: "RESET_VOLUME_SELECTION" });
    }

    if (!show) {
      dispatch({
        type: "SET_SEARCH_ARTICLE_ID",
        payload: "",
      });
    }
    if (id) {
      queryClient.invalidateQueries(["Article", id]);
    }
    dispatch({ type: "CLOSE_POPUP_RESPONSE" });
  };
  const invalidFileName = () => {
    dispatch({ type: "INVALID_FILE_TYPE" });
    dispatch({ type: "CLOSE_POPUP_RESPONSE" });
  };
  return (
    <div className="popup_response">
      <h2>{responseText}</h2>
      {!invalidFile && <PanelButton onClick={closePopup}>Close</PanelButton>}
      {invalidFile && <PanelButton onClick={invalidFileName}>Back</PanelButton>}
    </div>
  );
}
