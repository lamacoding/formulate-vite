import React from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import ClearAllTwoToneIcon from "@mui/icons-material/ClearAllTwoTone";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import StarTwoToneIcon from "@mui/icons-material/StarTwoTone";
import Logo from "../assets/logo.svg";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";

const SideMenuDashboard = () => {
  const navigate = useNavigate();
  const menuWidth = 300;

  const DrawerList = (
    <Box sx={{ width: menuWidth }} role="presentation">
      <List>
        <ListItem className="side-menu-heading">Forms</ListItem>
        <ListItem>
          <Button
            className="side-menu-item"
            startIcon={<AddCircleTwoToneIcon />}
            size="large"
            onMouseDown={() => {
              navigate("/dashboard/newform");
            }}
          >
            <ListItemText
              primary="Create new form"
              sx={{ paddingLeft: "10px", color: "text.secondary" }}
              disableTypography
            />
          </Button>
        </ListItem>
        <ListItem>
          <Button
            className="side-menu-item"
            startIcon={<ClearAllTwoToneIcon />}
            size="large"
            onMouseDown={() => {
              navigate("/dashboard/myforms");
            }}
          >
            <ListItemText
              primary="My Forms"
              sx={{ paddingLeft: "10px", color: "text.secondary" }}
              disableTypography
            />
          </Button>
        </ListItem>

        <Divider sx={{ marginY: "20px" }} />

        <ListItem className="side-menu-heading">Account</ListItem>
        <ListItem>
          <Button
            className="side-menu-item"
            startIcon={<AccountCircleTwoToneIcon />}
            size="large"
          >
            <ListItemText
              primary="Account settings"
              sx={{ paddingLeft: "10px", color: "text.secondary" }}
              disableTypography
            />
          </Button>
        </ListItem>
        <ListItem>
          <Button
            className="side-menu-item"
            startIcon={<StarTwoToneIcon />}
            size="large"
          >
            <ListItemText
              primary="Premium membership"
              sx={{ paddingLeft: "10px", color: "text.secondary" }}
              disableTypography
            />
          </Button>
        </ListItem>
      </List>
      <LogoutButton />
    </Box>
  );

  return (
    <>
      <Drawer
        variant="permanent"
        open
        anchor="left"
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: menuWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: menuWidth, overflowX: "hidden" }, // Ensure horizontal overflow is hidden for Drawer paper
        }}
      >
        <img
          src={Logo}
          alt="Formulate"
          style={{
            width: "40px",
            height: "40px",
            margin: "30px 40px",
            cursor: "pointer",
            transition: "transform 0.3s ease-in-out",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.3)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
          onClick={() => {
            window.location.href = "/dashboard";
          }}
        />
        {DrawerList}
      </Drawer>
    </>
  );
};

export default SideMenuDashboard;
