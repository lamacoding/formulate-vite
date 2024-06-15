import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { serverUri } from '../../backendServerConfig';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MyForms() {
  const sessionId = localStorage.getItem('sessionId');
  const navigate = useNavigate();

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

  const [rows, setRows] = useState([]);

  useEffect(() => {
    loadList();
  }, []);

  const loadList = async () => {
    try {
      const response = await fetch(`${serverUri}/api/form/all/bySessionId/${sessionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
     
      if (response.status === 404) {
        console.info('No forms found for this session.');
        setRows([]);
        return;
      }

      const data = await response.json();
      console.log(data);

      let newRows = [];
      data.map((item, index) => {
        newRows.push({ id: item.id, index: index + 1, formName: item.formName });
      });
      setRows(newRows);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <Box>
      <h1>My Forms</h1>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        pageSizeOptions={[8, 21 , 37]}
        columnVisibilityModel={{
          id: false,
        }}
        // disableRowSelectionOnClick
        onRowClick={(params) => {
          navigate(`/form/${params.row.id}`);
        }}
        sx={{ cursor: 'pointer' }}
      />
    </Box>
  );
}

export default MyForms;