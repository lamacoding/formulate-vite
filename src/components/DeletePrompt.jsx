import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { serverUri } from "../backendServerConfig";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

export default function DeletePrompt({ isOpen = false, onClose, onDelete, id }) {
  const [isLoading, setIsLoading] = useState(false);

  const deleteForm = async (id) => {
    setIsLoading(true);
    const response = await fetch(`${serverUri}/api/form/delete/${id}`, {
      method: "DELETE",
    });
    setIsLoading(false);
    if (response.status === 200) {
      console.log("Form deleted");
      onDelete();
    } else {
      console.log("Form not deleted");
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
          padding: "50px 24px",
        }}
      >
        <Typography variant="h6">
          Are you sure you want to delete this form?
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          This action cannot be undone.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <LoadingButton
            type="submit"
            variant="contained"
            color="error"
            sx={{ marginTop: "20px" }}
            loading={isLoading}
            onMouseDown={() => {
              setIsLoading(true);
              deleteForm(id);
              setIsLoading(false);
              onClose();
            }}
          >
            Delete
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
