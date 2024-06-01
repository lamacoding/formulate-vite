import React, {createContext, useState} from 'react';
import SideMenuFormEditor from "../SideMenuFormEditor";
import {AppBar, Box, Toolbar} from "@mui/material";
import FormEditor from "../FormEditor";


//Context that holds the current id of the form | formulate.form.id
export const CurrentFormContext = createContext(null);

function FormRoute() {
  const [currentFormId /*, setCurrentFormId*/] = useState("663bebcb11c02f2f8cf2a481");

  return (
    <CurrentFormContext.Provider value={currentFormId}>
      <Box sx={{display: 'flex'}}>
        <AppBar
          position="fixed"
          sx={{width: `calc(100% - 300px)`, ml: `300px`}}
        >
        </AppBar>
        <SideMenuFormEditor/>
        <Box
          component="main"

          sx={{flexGrow: 1, bgcolor: 'background.default', p: 3}}
        >
          <Toolbar/>
          <FormEditor/>
        </Box>
      </Box>
    </CurrentFormContext.Provider>
  );
}

export default FormRoute;
