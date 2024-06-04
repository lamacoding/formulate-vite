import React from "react";
import SideMenuDashboard from "../SideMenuDashboard";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

export const DashboardRoute = () => {
  return (
    <div style={{ display: "flex" }}>
      <SideMenuDashboard />
      <Outlet />
    </div>
  );
};

export default DashboardRoute;
