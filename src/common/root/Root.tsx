import Sidebar from "common/ui/sidebar/Sidebar";
import { Outlet } from "react-router";
import RoutesAuth from "./routes-auth/RoutesAuth";

export default function Root() {
  return (
    <RoutesAuth>
      <Sidebar />
      <Outlet />
    </RoutesAuth>
  );
}
