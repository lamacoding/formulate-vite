import { Button } from "@mui/material";
import React from "react";
import { serverUri } from "../backendServerConfig";

export default function LogoutButton() {
  const handleLogout = async () => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        sessionId: localStorage.getItem("sessionId"),
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
    <Button
      variant="contained"
      color="error"
      sx={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        marginTop: "20px",
      }}
      onMouseDown={handleLogout}
    >
      Logout
    </Button>
  );
}
