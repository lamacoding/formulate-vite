import { LoadingButton } from "@mui/lab";
import { Box, Button, Divider, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { CurrentFormSchemaContext } from "./routes/FormRoute";
import { useContext } from "react";

export default function EditFormInputPrompt({
  isOpen = false,
  onClose,
  field,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(field.label);
  const { schema, setSchema } = useContext(CurrentFormSchemaContext);

  const saveLabel = (value) => {
    const fieldIndex = schema.fields.findIndex((f) => f.name === field.name);
    if (fieldIndex !== -1) {
      const updatedFields = [...schema.fields];
      updatedFields[fieldIndex] = {
        ...updatedFields[fieldIndex],
        label: value.length > 0 ? value : "(No label)",
      };
      setSchema({ ...schema, fields: updatedFields });
    }
  };

  const handleEditOption = (id, value) => {
    const index = field.options.findIndex((o) => o.id === id);
    if (index !== -1) {
      field.options[index].value = value;
      setSchema({ ...schema });
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "10px",
          backgroundColor: "background.paper",
          padding: "30px 24px",
        }}
      >
        <Typography variant="h6" sx={{ textAlign: "center", marginBottom: "20px" }}>EDIT {field.type.toUpperCase()}</Typography>
        <TextField
          label="Set label"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          sx={{ width: "400px" }}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
        {(field.type === "checkbox" || field.type === "radio") && (
          <>
          <Divider sx={{ marginTop: "20px", color: "#BABABA" }}>Options</Divider>
          {field.options.map((option, index) => (
            <TextField
              label={`Option ${index + 1}`}
              value={option.value}
              onChange={(e) => handleEditOption(option.id, e.target.value)}
              sx={{ width: "400px", marginTop: "20px" }}
              />
              ))}
            </>
          )}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <LoadingButton
            type="submit"
            variant="contained"
            sx={{ marginTop: "20px" }}
            loading={isLoading}
            onMouseDown={() => {
              setIsLoading(true);
              saveLabel(value);
              setIsLoading(false);
              onClose();
            }}
          >
            Save
          </LoadingButton>
          <Button
            sx={{ marginTop: "20px", marginLeft: "20px" }}
            disabled={isLoading}
            onMouseDown={onClose}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

