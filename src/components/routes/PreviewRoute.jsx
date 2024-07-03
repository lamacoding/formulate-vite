import React, { createContext } from "react";
import { AppBar, Box, Toolbar } from "@mui/material";
import FormPreview from "../FormPreview";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { serverUri } from "../../backendServerConfig";

//Context that holds the current id of the form | formulate.form.id
export const CurrentFormContext = createContext(null);

//Context that holds the current form schema
export const CurrentFormSchemaContext = React.createContext({
  schema: { fields: [] }, // Default value with an empty fields array
  setSchema: () => {},
});

function PreviewRoute() {
  const { id } = useParams();
  const [schema, setSchema] = useState(null);

  useEffect(() => {
    fetch(`${serverUri}/api/form/id/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSchema(data);
      });
  }, []);

  return (
    <CurrentFormContext.Provider value={id}>
      <CurrentFormSchemaContext.Provider value={{ schema, setSchema }}>
        <Box sx={{ display: "flex" }}>
          <AppBar
            position="fixed"
            sx={{ width: `calc(100% - 300px)`, ml: `300px` }}
          ></AppBar>
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
          >
            <Toolbar />
            <FormPreview />
          </Box>
        </Box>
      </CurrentFormSchemaContext.Provider>
    </CurrentFormContext.Provider>
  );
}

export default PreviewRoute;

