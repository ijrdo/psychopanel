import PanelHeader from "common/ui/header/Header";
import { Outlet } from "react-router";
import RequiresAuth from "./requires-auth/RequiresAuth";
export default function RootPanel() {
  return (
    <>
      <RequiresAuth>
        <PanelHeader />
        <Outlet />
      </RequiresAuth>
    </>
  );
}
