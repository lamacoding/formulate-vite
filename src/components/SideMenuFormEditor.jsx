import React, {useContext, useState} from 'react';
import {Box, Button, Divider, Drawer, List, ListItemText, Toolbar, Typography} from '@mui/material';
import ListItem from '@mui/material/ListItem';
import {CurrentFormContext} from './routes/FormRoute';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import TextFieldsRoundedIcon from '@mui/icons-material/TextFieldsRounded';
import Crop75RoundedIcon from '@mui/icons-material/Crop75Rounded';
import Crop169RoundedIcon from '@mui/icons-material/Crop169Rounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropDownCircleRoundedIcon from '@mui/icons-material/ArrowDropDownCircleRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import {serverUri} from '../backendServerConfig';

import AiPromptModal from './AiPromptModal';

function SideMenuFormEditor() {

  const currentFormId = useContext(CurrentFormContext);
  const [isAiModalVisible, setIsAiModalVisible] = useState(false);

  const executeAction = (action) => {
    console.log(action);
  }

  const openAiModal = () => {
    setIsAiModalVisible(true);
  }

  const closeAiModal = () => {
    setIsAiModalVisible(false);
  }

  const addFormInput = (component) => {
    fetch(`${serverUri}/api/form/id/${currentFormId}`)
      .then(response => response.json())
      .then(data => {
          console.log(data);
          let newComponent = null;

          switch (component) {
            case 'label':
              newComponent = {
                'label': 'Enter label text',
                'name': 'label' + data.fields.length,
                'type': 'label'
              }
              break;

            case 'single-line-text':
              newComponent = {
                'label': 'Enter label text',
                'name': 'single-line-text' + data.fields.length,
                'type': 'single-line-text',
                'validation': {
                  'message': 'Invalid input',
                  'pattern': '.*',
                  'isRequired': false
                }
              }
              break;

            case 'multi-line-text':
              newComponent = {
                'label': 'Enter label text',
                'name': 'multi-line-text' + data.fields.length,
                'type': 'multi-line-text',
                'validation': {
                  'message': 'Invalid input',
                  'pattern': '.*',
                  'isRequired': false
                }
              }
              break;

            case 'checkbox':
              newComponent = {
                'label': 'Enter label text',
                'name': 'checkbox' + data.fields.length,
                'type': 'checkbox',
                'options': ['Option 1', 'Option 2', 'Option 3'],
                'validation': {
                  'message': 'Invalid input',
                  'isRequired': false
                }
              }
              break;

            case 'radio':
              newComponent = {
                'label': 'Enter label text',
                'name': 'radio' + data.fields.length,
                'type': 'radio',
                'options': ['Option 1', 'Option 2', 'Option 3'],
                'validation': {
                  'message': 'Invalid input',
                  'isRequired': false
                }
              }
              break;

            case 'date':
              newComponent = {
                'label': 'Enter label text',
                'name': 'date' + data.fields.length,
                'type': 'date',
                'validation': {
                  'message': 'Invalid input',
                  'isRequired': false
                }
              }
              break;

            case 'dropdown':
              newComponent = {
                'label': 'Enter label text',
                'name': 'dropdown' + data.fields.length,
                'type': 'dropdown',
                'options': ['Option 1', 'Option 2', 'Option 3'],
                'validation': {
                  'message': 'Invalid input',
                  'isRequired': false
                }
              }
              break;

            case 'multi-select-dropdown':
              newComponent = {
                'label': 'Enter label text',
                'name': 'multi-select-dropdown' + data.fields.length,
                'type': 'multi-select-dropdown',
                'options': ['Option 1', 'Option 2', 'Option 3'],
                'validation': {
                  'message': 'Invalid input',
                  'isRequired': false
                }
              }
              break;

            case 'file-upload':
              newComponent = {
                'label': 'Enter label text',
                'name': 'file-upload' + data.fields.length,
                'type': 'file-upload',
                'validation': {
                  'message': 'Invalid input',
                  'file-types': ['*'],
                  'isRequired': false
                }
              }
              break;

            default:
              throw new Error('Invalid input type');
          }

          data.fields.push(newComponent);

          fetch(`${serverUri}/api/form/update/${currentFormId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
            .then(response => response.json())
            .then(updatedData => {
              console.log(updatedData);
            })
            .catch(error => console.error('Error updating form:', error));


        }
      )
      .catch(error => console.error('Error loading JSON file:', error));
  }

  const menuWidth = 400;

  const DrawerList = (
    <Box sx={{width: menuWidth}} role='presentation'>
      <Toolbar>
        <Typography variant='h5' noWrap component='div'>
          [Logo] Formulate<br/>ID: {currentFormId}
        </Typography>
      </Toolbar>
      <Divider sx={{marginBottom: '20px'}}/>
      <List>
        <ListItem disablePadding>
          <Button className='side-menu-item'
                  startIcon={<AddRoundedIcon/>}
                  onClick={() => executeAction('new-form')}>
            <ListItemText primary='Create new form' sx={{paddingLeft: '10px'}}/>
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <Button className='side-menu-item'
                  startIcon={<SettingsRoundedIcon/>}
                  onClick={() => executeAction('form-settings')}>
            <ListItemText primary='Edit form settings' sx={{paddingLeft: '10px'}}/>
          </Button>
        </ListItem>
        <Divider sx={{marginY: '20px'}}/>
        <ListItem disablePadding>
          <Button className='side-menu-item'
                  startIcon={<TextFieldsRoundedIcon/>}
                  onClick={() => addFormInput('label')}>
            <ListItemText primary='Label' sx={{paddingLeft: '10px'}}/>
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <Button className='side-menu-item'
                  startIcon={<Crop169RoundedIcon/>}
                  onClick={() => addFormInput('single-line-text')}>
            <ListItemText primary='Single line input' sx={{paddingLeft: '10px'}}/>
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <Button className='side-menu-item'
                  startIcon={<Crop75RoundedIcon/>}
                  onClick={() => addFormInput('multi-line-text')}>
            <ListItemText primary='Multi line input' sx={{paddingLeft: '10px'}}/>
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <Button className='side-menu-item'
                  startIcon={<CheckBoxRoundedIcon/>}
                  onClick={() => addFormInput('checkbox')}>
            <ListItemText primary='Checkbox' sx={{paddingLeft: '10px'}}/>
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <Button className='side-menu-item'
                  startIcon={<RadioButtonCheckedRoundedIcon/>}
                  onClick={() => addFormInput('radio')}>
            <ListItemText primary='Radio' sx={{paddingLeft: '10px'}}/>
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <Button className='side-menu-item'
                  startIcon={<DateRangeRoundedIcon/>}
                  onClick={() => addFormInput('date')}>
            <ListItemText primary='Date' sx={{paddingLeft: '10px'}}/>
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <Button className='side-menu-item'
                  startIcon={<ArrowDropDownRoundedIcon/>}
                  onClick={() => addFormInput('dropdown')}>
            <ListItemText primary='Dropdown' sx={{paddingLeft: '10px'}}/>
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <Button className='side-menu-item'
                  startIcon={<ArrowDropDownCircleRoundedIcon/>}
                  onClick={() => addFormInput('multi-select-dropdown')}>
            <ListItemText primary='Multi-Select Dropdown' sx={{paddingLeft: '10px'}}/>
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <Button className='side-menu-item'
                  startIcon={<FileUploadRoundedIcon/>}
                  onClick={() => addFormInput('file-upload')}>
            <ListItemText primary='File-Upload' sx={{paddingLeft: '10px'}}/>
          </Button>
        </ListItem>
        <Divider sx={{marginY: '20px'}}/>
        <ListItem disablePadding>
          <Button className='side-menu-item'
                  startIcon={<AutoAwesomeRoundedIcon/>}
                  onClick={() => openAiModal()}>
            <ListItemText primary='AI Assistant' sx={{paddingLeft: '10px'}}/>
          </Button>
        </ListItem>
      </List>
      <AiPromptModal isOpen={isAiModalVisible} onClose={closeAiModal}/>
    </Box>
  );
  return (
    <div>
      <Drawer
        variant='permanent'
        open
        anchor='left'
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: menuWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {width: menuWidth},
        }}
      >
        {DrawerList}
      </Drawer>
      <AiPromptModal open={isAiModalVisible} onClose={closeAiModal}/>
    </div>
  );
}

export default SideMenuFormEditor
