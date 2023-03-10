import { usePanelData } from "app-manager/panel-context/PanelProvider";
import ResponsePopup from "common/ui/responsePopup/ResponsePopUp";
import React from "react";
import PanelArticleCard from "./PanelArticleCard";

export default function PanelArticlesList({ data }) {
  const { state } = usePanelData();
  const { popupResponse } = state;
  return (
    <>
      <div id="articles-list">
        {data.map((article, i) => (
          <PanelArticleCard article={article} key={i} />
        ))}
      </div>
      {popupResponse && (
        <div className="popupResponse">
          <ResponsePopup />
        </div>
      )}
    </>
  );
}
