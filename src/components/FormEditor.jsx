import React, { useContext, useEffect, useState } from "react";
// import old_schema from '../forms.json';
// import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CircularProgress from "@mui/material/CircularProgress";
import FormInput from "./FormInput";
import { CurrentFormContext } from "./routes/FormRoute";
import { serverUri } from "../backendServerConfig";
import AiPromptModal from "./AiPromptModal";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>{schema["formName"]}</h1>
      <form>
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
    </div>
  );
}

export default FormEditor;
