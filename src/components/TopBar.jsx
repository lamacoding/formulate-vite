import { Button, FormControlLabel } from "@mui/material";
import React from "react";
import { darkTheme, lightTheme } from "../theme";
import { ThemeToggle } from "./ThemeToggle";
import { serverUri } from "../backendServerConfig";

export default function TopBar({ currentTheme, setTheme }) {
  const handleLogout = async () => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        sessionId: localStorage.getItem("sessionId"),
        username: "dummyUsername",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await fetch(`${serverUri}/api/auth/logout`, requestOptions);

      localStorage.removeItem("sessionId");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        right: "30px",
        zIndex: "1000",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: "transparent !important",
      }}
    >
      <Button
        variant="outlined"
        color="error"
        sx={{ marginRight: "20px" }}
        onClick={handleLogout}
      >
        Logout
      </Button>

      <FormControlLabel
        control={
          <ThemeToggle
            sx={{ m: 1 }}
            checked={currentTheme === darkTheme}
            onChange={() =>
              setTheme(currentTheme === darkTheme ? lightTheme : darkTheme)
            }
          />
        }
      />
    </div>
  );
}
