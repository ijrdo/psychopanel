import { Outlet } from "react-router";
import RoutesAuth from "./routes-auth/RoutesAuth";

export default function Root() {
  return (
    <RoutesAuth>
      <Outlet />
    </RoutesAuth>
  );
}
