import React, { useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import FormInputPreview from "./FormInputPreview";
import {
  CurrentFormContext,
  CurrentFormSchemaContext,
} from "./routes/PreviewRoute";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import VisibilityOffTwoToneIcon from "@mui/icons-material/VisibilityOffTwoTone";
import { useNavigate } from "react-router-dom";

function PreviewForm() {
  const currentFormId = useContext(CurrentFormContext);
  const { schema } = useContext(CurrentFormSchemaContext);

  const navigate = useNavigate();

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
    <>
      <Button
        variant="contained"
        startIcon={<VisibilityOffTwoToneIcon />}
        sx={{ position: "fixed", top: "20px", left: "320px" }}
        onClick={() => {
          navigate(`/form/${currentFormId}`);
        }}
      >
        End preview
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          justifyContent: "center",
          margin: "0 auto",
          width: "70%",
          maxWidth: "1000px",
          backgroundColor: "background.paper",
          border: "0px solid",
          borderColor: "primary.main",
          borderRadius: "20px",
          padding: "20px 80px",
          transition: "box-shadow 0.3s",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            marginBottom: "20px",
            padding: "10px 20px",
          }}
        >
          {schema["formName"]}
        </Typography>

        <form style={{ width: "100%" }}>
          {schema.fields &&
            schema.fields.map((field, i) => (
              <Box
                sx={{
                  marginBottom: "15px",
                  display: "flex",
                  alignItems: "center",
                }}
                key={i}
              >
                <FormInputPreview field={field} />
              </Box>
            ))}
        </form>
      </Box>
    </>
  );
}

export default PreviewForm;
