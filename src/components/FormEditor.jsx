import React, { useContext, useEffect, useState } from "react";
// import old_schema from '../forms.json';
// import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CircularProgress from "@mui/material/CircularProgress";
import FormInput from "./FormInput";
import {
  CurrentFormContext,
  CurrentFormSchemaContext,
} from "./routes/FormRoute";
import { serverUri } from "../backendServerConfig";
import AiPromptModal from "./AiPromptModal";
import { Box, Button } from "@mui/material";

function FormEditor() {
  const currentFormId = useContext(CurrentFormContext);
  const { schema, setSchema } = useContext(CurrentFormSchemaContext);

  useEffect(() => {
    console.log("Schema has changed.");
  }, [schema]);

  if (!schema) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  const handleSave = () => {
    console.log("save");
    fetch(`${serverUri}/api/form/update/${currentFormId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((updatedData) => {
        console.log(updatedData);
      })
      .catch((error) => console.error("Error updating form:", error));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
          width: "70%",
          backgroundColor: "background.paper",
          border: "0px solid",
          borderColor: "primary.main",
          borderRadius: "20px",
          padding: "20px 80px",
          transition: "box-shadow 0.3s",
        }}
      >
        <h1>{schema["formName"]}</h1>
        <form style={{ width: "100%" }}>
          {schema["fields"].map((field, i) => (
            <div
              style={{
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
              }}
              key={i}
            >
              <FormInput field={field} id={field.name} />
            </div>
          ))}
        </form>
        <AiPromptModal />
        <Button variant="contained" onClick={handleSave}>
          Save current form
        </Button>
      </Box>
    </>
  );
}

export default FormEditor;
