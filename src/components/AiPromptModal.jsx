import * as React from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
import { aiServerUri } from "../backendServerConfig";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

function AiPromptModal({ isOpen = false, onClose }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const aiPrompt = document.getElementById("aiPrompt").value;

    try {
      setIsLoading(true);
      const response = await fetch(`${aiServerUri}/api/ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: aiPrompt,
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 300,
          backgroundColor: "background.default",
          border: "2px solid transparent",
          borderImage: "linear-gradient(45deg, #13b0b4, #b413b0)",
          borderImageSlice: 1,
          padding: "50px 24px",
        }}

      >
        <form onSubmit={handleSubmit} autoComplete="off">
          <TextField
            fullWidth={true}
            label="What do you want to generate? (Current form will be overwritten)"
            id="aiPrompt"
            multiline
            rows={5}
            required={true}
            disabled={isLoading}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <LoadingButton
              type="submit"
              variant="contained"
              sx={{ marginTop: "20px" }}
              loading={isLoading}
            >
              AI Generation
            </LoadingButton>
            <Button
              sx={{ marginTop: "20px", marginLeft: "20px" }}
              disabled={isLoading}
              onClick={onClose}
            >
              Close
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default AiPromptModal;
