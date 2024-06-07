import SideMenuDashboard from "../SideMenuDashboard";
import { Outlet } from "react-router-dom";

export const DashboardRoute = () => {
  return (
    <div style={{ display: "flex" }}>
      <SideMenuDashboard />
      <Outlet />
    </div>
  );
};

export default DashboardRoute;
