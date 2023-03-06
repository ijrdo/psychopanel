import produce from "immer";
import { State, Actions } from "types/authTypes";

export const reducer = produce((state: State, action: Actions) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_USER_NAME":
      state.username = payload;
      break;
    case "SET_PASSWORD":
      state.password = payload;
      break;
    case "SET_TOKEN":
      state.token = payload;
      break;
    case "SET_SESSIONID":
      state.sessionId = payload;
      break;
    case "SET_SESSION_RUNNING":
      state.sessionRunning = true;
      break;
    default:
      return state;
  }
});
