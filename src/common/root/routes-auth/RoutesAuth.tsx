import { ReactNode } from "react";
import Login from "../../../pages/login/Login";

type Props = {
  children: ReactNode;
};

export default function RoutesAuth({ children }: Props) {
  const token = false;
  if (token) return <>{children}</>;
  return <Login />;
}
