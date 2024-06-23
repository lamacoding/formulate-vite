import React from "react";
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { Box, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { serverUri } from "../../backendServerConfig";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeletePrompt from "../DeletePrompt";
import CachedTwoToneIcon from "@mui/icons-material/CachedTwoTone";
import { LoadingButton } from "@mui/lab";

// {
//   field: "Aktion",

//   flex: 0.5,
//   minWidth: 80,
// },

function MyForms() {
  const sessionId = localStorage.getItem("sessionId");
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deletePrompt, setDeletePrompt] = useState({
    visible: false,
    id: "",
    formName: "",
  });

  const columns = [
    { field: "id" },
    { field: "index", headerName: "#", width: 150, editable: false },
    {
      field: "formName",
      headerName: "Form name",
      width: 500,
      editable: false,
    },
    {
      field: "delete",
      headerName: "",
      renderCell: (cellValues) => {
        return (
          <IconButton
            variant="contained"
            sx={{ color: "#CC0000" }}
            onMouseDown={(event) => {
              event.stopPropagation();
              setDeletePrompt({
                visible: true,
                id: cellValues.row.id,
                formName: cellValues.row.formName,
              });
            }}
          >
            <DeleteIcon />
          </IconButton>
        );
      },
      width: 60,
      editable: false,
    },
  ];

  useEffect(() => {
    loadList();
  }, [refreshTrigger]); // Depend on refreshTrigger instead of rows#

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarQuickFilter
          placeholder="Search"
          variant="standard"
          style={{
            width: "30%",
            minWidth: "200px",
            paddingBottom: "10px",
            paddingTop: "15px",
            paddingLeft: "5px",
          }}
        />
        {/* <GridToolbarExport style={{ position: "absolute", right: "10px" }} /> */}
      </GridToolbarContainer>
    );
  }

  const loadList = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${serverUri}/api/form/all/bySessionId/${sessionId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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
          formName: item.formName,
          index: index + 1,
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
    setRefreshTrigger((prev) => !prev); // Toggle the state to trigger useEffect
  };

  return (
    <>
      <DeletePrompt
        isOpen={deletePrompt.visible}
        id={deletePrompt.id}
        formName={deletePrompt.formName}
        onClose={() =>
          setDeletePrompt({ visible: false, id: "", formName: "" })
        }
        onDelete={() => {
          setDeletePrompt({ visible: false, id: "", formName: "" });
          refreshData();
        }}
      />
      <Box>
        <h1>My Forms</h1>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={isLoading}
          slots={{
            toolbar: CustomToolbar,
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10, 20, 30]}
          columnVisibilityModel={{
            id: false,
          }}
          onRowClick={(params) => {
            navigate(`/form/${params.row.id}`);
          }}
          sx={{ cursor: "pointer", minHeight: "300px" }}
        />
        <LoadingButton
          loading={isLoading}
          onMouseDown={refreshData}
          sx={{ mt: 2 }}
          startIcon={<CachedTwoToneIcon />}
        >
          Refresh
        </LoadingButton>
      </Box>
    </>
  );
}

export default MyForms;
