export type Actions =
  | {
      type: "SET_USER_NAME";
      payload: string;
    }
  | {
      type: "SET_PASSWORD";
      payload: string;
    }
  | {
      type: "SET_TOKEN";
      payload: string;
    }
  | {
      type: "SET_SESSIONID";
      payload: string;
    }
  | {
      type: "SET_SESSION_RUNNING";
      payload?: null;
    };

export type State = {
  username: string;
  password: string;
  token: string;
  sessionId: string;
  sessionRunning: boolean;
};
