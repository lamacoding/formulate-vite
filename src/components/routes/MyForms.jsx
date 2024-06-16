import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { serverUri } from "../../backendServerConfig";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyForms() {
  const sessionId = localStorage.getItem("sessionId");
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    { field: "id" },
    { field: "index", headerName: "#", width: 150, editable: false },
    {
      field: "formName",
      headerName: "Form name",
      width: 500,
      editable: false,
    },
  ];

  useEffect(() => {
    loadList();
  }, [refreshTrigger]); // Depend on refreshTrigger instead of rows

  const loadList = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${serverUri}/api/form/all/bySessionId/${sessionId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache", // Disable caching
            "Pragma": "no-cache", // Disable caching
            "Expires": "0", // Disable caching
          },
        }
      );

      if (response.status === 404) {
        console.info("No forms found for this session.");
        setRows([]);
        return;
      }

      const data = await response.json();

      let newRows = [];
      data.map((item, index) => {
        newRows.push({
          id: item.id,
          index: index + 1,
          formName: item.formName,
          key: item.id,
        });
      });
      setRows(newRows);
      setIsLoading(false);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  // Function to trigger a refresh
  const refreshData = () => {
    setRefreshTrigger(prev => !prev); // Toggle the state to trigger useEffect
  };

  return (
    <Box>
      <h1>My Forms</h1>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={isLoading}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 30]}
        columnVisibilityModel={{
          id: false,
        }}
        onRowClick={(params) => {
          navigate(`/form/${params.row.id}`);
        }}
        sx={{ cursor: "pointer", minHeight: "300px" }}
      />
      <Button onClick={refreshData}>Refresh</Button>
    </Box>
  );
}

export default MyForms;
