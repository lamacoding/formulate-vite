import { Box } from "@mui/material";
import SideMenuDashboard from "../SideMenuDashboard";
import { Outlet } from "react-router-dom";

export const DashboardRoute = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <SideMenuDashboard />
      <Box sx={{
        marginTop: "100px",
        marginX: "100px",
        width: "100%",
        bgcolor: "background.paper",
        borderRadius: "10px",
        padding: "40px",
      }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardRoute;
