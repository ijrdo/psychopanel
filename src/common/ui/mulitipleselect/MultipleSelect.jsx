import "./style.css";
import { useRef } from "react";
import { useState } from "react";
import cross from "assets/media/svg/close.svg";
import { usePanelData } from "app-manager/panel-context/PanelProvider";
export default function MultipleSelect({ selects, type }) {
  const { dispatch } = usePanelData();
  const [key, setKey] = useState("");
  const node = useRef();
  const handleDelete = (value) => {
    const remainingSelects = selects.filter((val) => val !== value);
    dispatch({ type, payload: remainingSelects });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const exist = selects.findIndex((select) => select === key);
    if (exist !== -1) {
      setKey("");
      node.current.focus();
      return;
    }

    if (key) {
      dispatch({ type, payload: [...selects, key] });
    }
    setKey("");
    node.current.focus();
  };
  const deleteAll = (e) => {
    e.preventDefault();
    dispatch({ type, payload: [] });
    setKey("");
    node.current.focus();
  };

  return (
    <div id="MultipleSelect">
      {selects.length > 0 &&
        selects.map((select) => (
          <div key={select}>
            <span>{select}</span>
            <img
              onClick={(e) => handleDelete(select)}
              src={cross}
              alt="cross svg"
            />
          </div>
        ))}
      <input
        ref={node}
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <div className="MultipleSelect-btns">
        <button className="MultipleSelect-addbtn" onClick={handleSubmit}>
          +
        </button>
        <button className="MultipleSelect-addbtn" onClick={deleteAll}>
          <img src={cross} alt="cross svg" />
        </button>
      </div>
    </div>
  );
}
