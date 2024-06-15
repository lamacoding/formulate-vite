import React, { createContext } from "react";
import SideMenuFormEditor from "../SideMenuFormEditor";
import { AppBar, Box, Toolbar } from "@mui/material";
import FormEditor from "../FormEditor";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { serverUri } from "../../backendServerConfig";

//Context that holds the current id of the form | formulate.form.id
export const CurrentFormContext = createContext(null);

//Context that holds the current form schema
export const CurrentFormSchemaContext = createContext({});

function FormRoute() {
  const { id } = useParams();
  const [schema, setSchema] = useState(null);

  useEffect(() => {
    fetch(`${serverUri}/api/form/id/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSchema(data);
      });
  }, [id]);

  return (
    <CurrentFormContext.Provider value={id}>
      <CurrentFormSchemaContext.Provider value={schema}>
        <Box sx={{ display: "flex" }}>
          <AppBar
            position="fixed"
            sx={{ width: `calc(100% - 300px)`, ml: `300px` }}
          ></AppBar>
          <SideMenuFormEditor />
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
          >
            <Toolbar />
            <FormEditor />
          </Box>
        </Box>
      </CurrentFormSchemaContext.Provider>
    </CurrentFormContext.Provider>
  );
}

export default FormRoute;
