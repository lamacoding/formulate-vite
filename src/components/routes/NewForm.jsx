import { Box, Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import { serverUri } from "../../backendServerConfig";

export default function NewForm() {
  const createForm = async (formData) => {
    try {
      const response = await fetch(`${serverUri}/api/form/create`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create form");
      }

      const result = await response.json();
      console.log("Form created successfully:", result);
      // Optionally, handle further actions like redirecting the user
    } catch (error) {
      console.error("Error creating form:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      formName: document.getElementById("form-name").value,
      // description: document.getElementById('form-description').value,
      // expiryDate: document.getElementById('expiry-date').value,
    };
    createForm(formData);
  };

  return (
    <Box width="100%">
      <h1>New Form</h1>
      <form onSubmit={handleSubmit}>
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
          <TextField
            id="form-name"
            label="Name"
            variant="outlined"
            sx={{ width: "50%" }}
            margin="normal"
            required
          />
          <TextField
            id="form-description"
            label="Description"
            variant="outlined"
            sx={{ width: "50%" }}
            margin="normal"
            multiline
            rows={4}
            disabled
          />
          <DatePicker
            id="expiry-date"
            label="Expiry Date"
            variant="outlined"
            sx={{ width: "50%", marginY: "20px" }}
            disabled
          />
          <Box sx={{ display: "flex", alignItems: "center", width: "50%" }}>
            <Button type="submit" variant="contained">
              Create form
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}