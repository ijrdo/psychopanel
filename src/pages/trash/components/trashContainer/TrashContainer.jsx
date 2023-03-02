import React from "react";
import TrashList from "../trashList/TrashList";
import "./style.css";

export default function TrashContainer({ state }) {
  return (
    <div id="TrashContainer">
      <h2>Trash Bin</h2>
      {state.map((article, i) => (
        <TrashList key={i} article={article} />
      ))}
    </div>
  );
}
