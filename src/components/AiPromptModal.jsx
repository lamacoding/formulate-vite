import * as React from 'react';
import {Button, Modal, TextField} from "@mui/material";
import {aiServerUri} from "../backendServerConfig";
import {useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";

function AiPromptModal({open, onClose}) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const aiPrompt = document.getElementById("aiPrompt").value;

    try {
      setIsLoading(true);
      const response = await fetch(`${aiServerUri}/api/ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: aiPrompt
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 400,
        backgroundColor: '#001E2B',
        border: '1px solid',
        borderColor: 'background.paper',
        borderRadius: '15px',
        boxShadow: 24,
        padding: '50px 24px',
      }}>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <TextField fullWidth={true}
                     label="KI Prompt eingeben"
                     id="aiPrompt"
                     multiline
                     rows={10}
                     required={true}
                     disabled={isLoading}/>
          <Button
            type="submit"
            variant='contained'
            sx={{marginTop: '20px'}}
            disabled={isLoading}>KI Generierung</Button>
          <Button
            sx={{marginTop: '20px', marginLeft: '20px'}}
            disabled={isLoading}
            onClick={onClose}>Schließen</Button>
          {isLoading && <div style={{
            position: 'absolute',
            top: '180px',
            left: '180px'
          }}>
            <React.Fragment>
              <svg width={0} height={0}>
                <defs>
                  <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#e01cd5"/>
                    <stop offset="100%" stopColor="#1CB5E0"/>
                  </linearGradient>
                </defs>
              </svg>
              <CircularProgress sx={{'svg circle': {stroke: 'url(#my_gradient)'}}}/>
            </React.Fragment></div>}
        </form>
      </div>
    </Modal>
  );
}

export default AiPromptModal;