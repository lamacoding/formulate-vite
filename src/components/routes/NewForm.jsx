import { Box, Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import { serverUri } from "../../backendServerConfig";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

function NewForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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
    } catch (error) {
      console.error("Error creating form:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      formName: document.getElementById("form-name").value,
      sessionId: localStorage.getItem("sessionId"),
      // description: document.getElementById('form-description').value,
      // expiryDate: document.getElementById('expiry-date').value,
    };
    setIsLoading(true);
    createForm(formData);
    setIsLoading(false);
    navigate("/dashboard");
  };

  return (
    <Box>
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
            <LoadingButton type="submit" variant="contained" loading={isLoading}>
              Create form
            </LoadingButton>
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default NewForm;
