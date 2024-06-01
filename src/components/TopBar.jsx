import { Button, FormControlLabel } from "@mui/material";
import React from "react";
import { darkTheme, lightTheme } from "../theme";
import { ThemeToggle } from "./ThemeToggle";
import { serverUri } from "../backendServerConfig";

export default function TopBar({ currentTheme, setTheme }) {
  return (
    <div
      style={{
        position: "fixed",
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
