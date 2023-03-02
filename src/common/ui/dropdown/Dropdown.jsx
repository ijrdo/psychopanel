import React from "react";
import { useState } from "react";
import "./style.css";
import closeMenu from "assets/media/svg/closeMenu.svg";
import openMenu from "assets/media/svg/openMenu.svg";
import { usePanelData } from "app-manager/panel-context/PanelProvider";
export default function Dropdown({ options, content, type }) {
  const { dispatch } = usePanelData();
  const [toggle, setToggle] = useState(false);

  const handleSelect = (content) => {
    dispatch({ type, payload: content });
    setToggle(false);
  };
  return (
    <div id="Dropdown">
      <div className={`Dropdown-label ${toggle && "Dropdown-active"}`}>
        <input
          type="text"
          value={content}
          onClick={(e) => setToggle((prev) => !prev)}
          className="Dropdown-input"
          readOnly
        />
        <img src={toggle ? closeMenu : openMenu} alt="menu btn" />
      </div>
      {toggle && (
        <div className="Dropdown-options">
          {options &&
            options.map((option) => (
              <p
                className="Dropdown-option"
                onClick={() => handleSelect(option)}
                key={option}
              >
                {option}
              </p>
            ))}
        </div>
      )}
    </div>
  );
}
