import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { serverUri } from '../../backendServerConfig';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const columns = [
  { field: 'id', headerName: '#', width: 90 },
  {
    field: 'formName',
    headerName: 'Form name',
    width: 500,
    editable: false,
  },
];

function MyForms() {
  const sessionId = localStorage.getItem('sessionId');
  const navigate = useNavigate();
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
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);

      let newRows = [];
      data.map((item, index) => {
        newRows.push({ id: index + 1, formName: item.formName });
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
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        // disableRowSelectionOnClick
        onRowClick={(params) => {
          console.log(params);
          navigate(`/form?id=${params.row.id}`);
        }}
        sx={{ cursor: 'pointer' }}
      />
    </Box>
  );
}

export default MyForms;