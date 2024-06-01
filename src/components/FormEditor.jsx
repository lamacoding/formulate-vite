import React, { useContext, useEffect, useState } from "react";
// import old_schema from '../forms.json';
// import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CircularProgress from "@mui/material/CircularProgress";
import FormInput from "./FormInput";
import { CurrentFormContext } from "./routes/FormRoute";
import { serverUri } from "../backendServerConfig";
import AiPromptModal from "./AiPromptModal";
import { Box } from "@mui/material";

function FormEditor() {
  const currentFormId = useContext(CurrentFormContext);
  const [schema, setSchema] = useState(null);

  useEffect(() => {
    fetch(`${serverUri}/api/form/id/${currentFormId}`)
      .then((response) => response.json())
      .then((data) => {
        setSchema(data);
      });
  }, [currentFormId]);

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

  return (
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
            {/*<DragIndicatorIcon sx={{fontSize: "24px"}}/>*/}
          </div>
        ))}
      </form>
      <AiPromptModal />
    </Box>
  );
}

export default FormEditor;
