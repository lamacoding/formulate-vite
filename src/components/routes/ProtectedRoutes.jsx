import React, {Suspense, useEffect, useState} from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import {Navigate, Outlet} from "react-router-dom";
import {checkIsAuthenticated} from "../../js/checkAuth";

function ProtectedRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null indicates loading state

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const authStatus = await checkIsAuthenticated();
        setIsAuthenticated(authStatus);
      } catch (error) {
        console.error('Failed to check authentication status', error);
        setIsAuthenticated(false); // Set to false if there's an error
      }
    };

    fetchAuthStatus();
  }, [isAuthenticated]);

  if (isAuthenticated === null) {
    return <CircularProgress />; // Show loading indicator while checking auth status
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return (
    <Suspense fallback={
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <CircularProgress />
    </div>
    }>

      <Outlet />
    </Suspense>
  );
}


export default ProtectedRoutes;
