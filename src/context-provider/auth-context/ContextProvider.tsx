import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { Actions, State } from "types/authTypes";
import { initialState } from "./initialState";
import { reducer } from "./reducer";

const AuthState = createContext<State>(initialState);
const AuthDispatch = createContext<Dispatch<Actions>>(
  ({ type, payload }: Actions): void => {}
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthState.Provider value={state}>
      <AuthDispatch.Provider value={dispatch}>{children}</AuthDispatch.Provider>
    </AuthState.Provider>
  );
};

export const useAuthState = () => useContext(AuthState);
export const useAuthDispatch = () => useContext(AuthDispatch);

export default AuthProvider;
