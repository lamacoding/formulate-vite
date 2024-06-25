import { LoadingButton } from "@mui/lab";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { CurrentFormSchemaContext } from "./routes/FormRoute";
import { useContext } from "react";

export default function EditFormInputPrompt({
  isOpen = false,
  onClose,
  id,
  initialValue,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(initialValue);
  const { schema, setSchema } = useContext(CurrentFormSchemaContext);

  const saveLabel = (value) => {
    setSchema({ ...schema, [id]: { ...schema[id], label: value } });
    console.log(schema);
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
          padding: "50px 24px",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Edit element: {id}
        </Typography>
        <TextField
          label="Set label"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          sx={{ width: "400px" }}
        />
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
