import React, {lazy, useEffect, useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.css";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "./components/routes/Login";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {lightTheme, darkTheme} from "./theme";
import ProtectedRoutes from "./components/routes/ProtectedRoutes";
import TopBar from "./components/TopBar";
import DashboardRoute from "./components/routes/DashboardRoute";
import NewForm from "./components/routes/NewForm";
import MyForms from "./components/routes/MyForms";

const FormRoute = lazy(() => import("./components/routes/FormRoute"));

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "light" ? lightTheme : darkTheme
  );

  useEffect(() => {
    localStorage.setItem("theme", theme === lightTheme ? "light" : "dark");
  }, [theme]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TopBar currentTheme={theme} setTheme={setTheme}/>
        <BrowserRouter>
          <Routes>
            <Route index element={<Login/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route element={<ProtectedRoutes/>}>
              <Route path="/dashboard" element={<DashboardRoute/>}>
                <Route path="newform" element={<NewForm/>}/>
                <Route index path="*" element={<MyForms/>}/>
              </Route>
              <Route path="/form" element={<FormRoute/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
