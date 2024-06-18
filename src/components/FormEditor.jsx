import React, { useContext, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import FormInput from "./FormInput";
import {
  CurrentFormContext,
  CurrentFormSchemaContext,
} from "./routes/FormRoute";
import { serverUri } from "../backendServerConfig";
import AiPromptModal from "./AiPromptModal";
import {
  Box,
  Button,
  Divider,
  Snackbar,
  Typography,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

function FormEditor() {
  const currentFormId = useContext(CurrentFormContext);
  const { schema, setSchema } = useContext(CurrentFormSchemaContext);
  const [isAiModalVisible, setIsAiModalVisible] = useState(false);
  const [savePrompt, setSavePrompt] = useState({
    visible: false,
    severity: "",
    message: "",
  });
  const [saving, setSaving] = useState(false);

  const openAiModal = () => {
    setIsAiModalVisible(true);
  };

  const closeAiModal = () => {
    setIsAiModalVisible(false);
  };

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

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(
        `${serverUri}/api/form/update/${currentFormId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(schema),
        }
      );
      const updatedData = await response.json();
      setSavePrompt({
        visible: true,
        severity: "success",
        message: "Form saved successfully",
      });
    } catch (error) {
      setSavePrompt({
        visible: true,
        severity: "error",
        message: "Error saving form",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={savePrompt.visible}
        autoHideDuration={6000}
        onClose={() =>
          setSavePrompt({ visible: false, severity: "", message: "" })
        }
      >
        <Alert
          onClose={() =>
            setSavePrompt({ visible: false, severity: "", message: "" })
          }
          severity={savePrompt.severity}
          variant="filled"
        >
          {savePrompt.message}
        </Alert>
      </Snackbar>
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
          {schema.fields &&
            schema.fields.map((field, i) => (
              <div
                style={{
                  marginBottom: "15px",
                  display: "flex",
                  alignItems: "center",
                }}
                key={i}
              >
                <FormInput field={field} />
              </div>
            ))}
        </form>
        {schema.fields && schema.fields.length > 0 && (
          <Divider sx={{ width: "100%", marginY: 4, color: "#BABABA" }}>
            End of form
          </Divider>
        )}
        <AiPromptModal />
        {schema.fields && schema.fields.length > 0 ? (
          <LoadingButton
            variant="contained"
            onMouseDown={handleSave}
            loading={saving}
          >
            Save current form
          </LoadingButton>
        ) : (
          <>
            <Typography
              variant="body1"
              sx={{ marginTop: "20px", color: "gray" }}
            >
              Start adding form elements by clicking on the items in the left
              menu.
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginTop: "20px", color: "gray" }}
            >
              Or start using the
              <Button
                onMouseDown={openAiModal}
                variant="outlined"
                sx={{ marginX: "8px" }}
              >
                AI assistant
              </Button>
              to generate a form for you.
            </Typography>
          </>
        )}
      </Box>
      <AiPromptModal isOpen={isAiModalVisible} onClose={closeAiModal} />
    </>
  );
}

export default FormEditor;
