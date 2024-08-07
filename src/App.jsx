import React, {lazy, useEffect, useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.css";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "./components/routes/Login";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {lightTheme, darkTheme} from "./theme";
import TopBar from "./components/TopBar";
import Register from "./components/routes/Register";

const ProtectedRoutes = lazy(() => import("./components/routes/ProtectedRoutes"));
const DashboardRoute = lazy(() => import("./components/routes/DashboardRoute"));
const FormRoute = lazy(() => import("./components/routes/FormRoute"));
const NewForm = lazy(() => import("./components/routes/NewForm"));
const MyForms = lazy(() => import("./components/routes/MyForms"));
const PreviewRoute = lazy(() => import("./components/routes/PreviewRoute"));

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
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route element={<ProtectedRoutes/>}>
              <Route path="/dashboard" element={<DashboardRoute/>}>
                <Route path="newform" element={<NewForm/>}/>
                <Route index path="*" element={<MyForms/>}/>
              </Route>
              <Route path="/form/:id" element={<FormRoute/>}/>
              <Route path="/preview/:id" element={<PreviewRoute/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
