import { useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";
import initialState from "./initialState";
import reducer from "./reducer";

const PanelContext = createContext();

export const usePanelData = () => useContext(PanelContext);

export default function PanelProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = {
    state,
    dispatch,
  };
  return (
    <PanelContext.Provider value={value}>{children}</PanelContext.Provider>
  );
}
