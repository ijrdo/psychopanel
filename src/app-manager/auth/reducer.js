import produce from "immer";

export default produce((draft, action) => {
  switch (action.type) {
    case "USERNAME":
      draft.userName = action.payload;
      break;
    case "LOGOUT":
      draft.userName = "";
      draft.passkey = "";
      draft.token = "";
      draft.sessionId = "";
      draft.sessionRunning = false;
      break;
    case "PASSKEY":
      draft.passkey = action.payload;
      break;
    case "SET_TOKEN":
      draft.token = action.payload;
      break;
    case "SET_SESSION":
      draft.sessionId = action.payload;
      break;
    case "SET_SESSION_RUNNING":
      draft.sessionRunning = true;
      break;
    default:
      return draft;
  }
});
