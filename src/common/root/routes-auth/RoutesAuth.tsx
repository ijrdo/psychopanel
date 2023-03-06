import { useAuthState } from "context-provider/auth-context/ContextProvider";
import { ReactNode } from "react";
import Login from "../../../pages/login/Login";

type Props = {
  children: ReactNode;
};

export default function RoutesAuth({ children }: Props) {
  const { token } = useAuthState();
  if (token) return <>{children}</>;
  return <Login />;
}
