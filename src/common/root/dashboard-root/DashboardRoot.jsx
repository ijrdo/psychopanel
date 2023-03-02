import MainContainer from "common/ui/dashboard-tabs/MainContainer";
import React from "react";
import { Outlet } from "react-router";

export default function DashboardRoot() {
  return (
    <>
      <MainContainer />
      <Outlet />
    </>
  );
}
