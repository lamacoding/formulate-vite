import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItemText,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import {
  CurrentFormContext,
  CurrentFormSchemaContext,
} from "./routes/FormRoute";
import Logo from "../assets/logo.svg";

import TextFieldsTwoToneIcon from "@mui/icons-material/TextFieldsTwoTone";
import Crop75TwoToneIcon from "@mui/icons-material/Crop75TwoTone";
import Crop169TwoToneIcon from "@mui/icons-material/Crop169TwoTone";
import CheckBoxTwoToneIcon from "@mui/icons-material/CheckBoxTwoTone";
import RadioButtonCheckedTwoToneIcon from "@mui/icons-material/RadioButtonCheckedTwoTone";
import DateRangeTwoToneIcon from "@mui/icons-material/DateRangeTwoTone";
import ArrowDropDownTwoToneIcon from "@mui/icons-material/ArrowDropDownTwoTone";
// import ArrowDropDownCircleTwoToneIcon from "@mui/icons-material/ArrowDropDownCircleTwoTone";
import FileUploadTwoToneIcon from "@mui/icons-material/FileUploadTwoTone";
import AutoAwesomeTwoToneIcon from "@mui/icons-material/AutoAwesomeTwoTone";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";

import AiPromptModal from "./AiPromptModal";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";

function SideMenuFormEditor() {
  const navigate = useNavigate();
  // const currentFormId = useContext(CurrentFormContext);
  const { schema, setSchema } = useContext(CurrentFormSchemaContext);
  const [isAiModalVisible, setIsAiModalVisible] = useState(false);

  const openAiModal = () => {
    setIsAiModalVisible(true);
  };

  const closeAiModal = () => {
    setIsAiModalVisible(false);
  };

  const addFormInput = (component) => {
    let newComponent = null;

    switch (component) {
      case "label":
        newComponent = {
          label: "Enter label text",
          name: "label" + (schema.fields ? schema.fields.length : 0),
          type: "label",
        };
        break;

      case "single-line-text":
        newComponent = {
          label: "Enter label text",
          name: "single-line-text" + (schema.fields ? schema.fields.length : 0),
          type: "single-line-text",
          validation: {
            message: "Invalid input",
            pattern: ".*",
            isRequired: false,
          },
        };
        break;

      case "password":
        newComponent = {
          label: "Enter label text",
          name: "password" + (schema.fields ? schema.fields.length : 0),
          type: "password",
          validation: {
            message: "Invalid input",
            pattern: ".*",
            isRequired: false,
          },
        };
        break;

      case "multi-line-text":
        newComponent = {
          label: "Enter label text",
          name: "multi-line-text" + (schema.fields ? schema.fields.length : 0),
          type: "multi-line-text",
          validation: {
            message: "Invalid input",
            pattern: ".*",
            isRequired: false,
          },
        };
        break;

      case "checkbox":
        newComponent = {
          label: "Enter label text",
          name: "checkbox" + (schema.fields ? schema.fields.length : 0),
          type: "checkbox",
          options: ["Option 1", "Option 2", "Option 3"],
          validation: {
            message: "Invalid input",
            isRequired: false,
          },
        };
        break;

      case "radio":
        newComponent = {
          label: "Enter label text",
          name: "radio" + (schema.fields ? schema.fields.length : 0),
          type: "radio",
          options: ["Option 1", "Option 2", "Option 3"],
          validation: {
            message: "Invalid input",
            isRequired: false,
          },
        };
        break;

      case "date":
        newComponent = {
          label: "Enter label text",
          name: "date" + (schema.fields ? schema.fields.length : 0),
          type: "date",
          validation: {
            message: "Invalid input",
            isRequired: false,
          },
        };
        break;

      case "dropdown":
        newComponent = {
          label: "Enter label text",
          name: "dropdown" + (schema.fields ? schema.fields.length : 0),
          type: "dropdown",
          options: ["Option 1", "Option 2", "Option 3"],
          validation: {
            message: "Invalid input",
            isRequired: false,
          },
        };
        break;

      case "multi-select-dropdown":
        newComponent = {
          label: "Enter label text",
          name:
            "multi-select-dropdown" +
            (schema.fields ? schema.fields.length : 0),
          type: "multi-select-dropdown",
          options: ["Option 1", "Option 2", "Option 3"],
          validation: {
            message: "Invalid input",
            isRequired: false,
          },
        };
        break;

      case "file-upload":
        newComponent = {
          label: "Enter label text",
          name: "file-upload" + (schema.fields ? schema.fields.length : 0),
          type: "file-upload",
          validation: {
            message: "Invalid input",
            "file-types": ["*"],
            isRequired: false,
          },
        };
        break;

      default:
        throw new Error("Invalid input type");
    }
    setSchema((prevSchema) => ({
      ...prevSchema,
      fields: [...(prevSchema.fields || []), newComponent],
    }));
  };

  const menuWidth = 300;

  const DrawerList = (
    <Box sx={{ width: menuWidth, height: "100vh" }} role="presentation">
      <List>
        <ListItem>
          <Button
            className="side-menu-item"
            startIcon={<HomeTwoToneIcon />}
            size="large"
            onMouseDown={() => navigate("/dashboard")}
          >
            <ListItemText
              primary="Dashboard"
              sx={{ paddingLeft: "10px", color: "text.secondary" }}
              disableTypography
            />
          </Button>
        </ListItem>

        <Divider sx={{ marginY: "20px" }} />
        <ListItem className="side-menu-heading">Input elements</ListItem>
        <ListItem>
          <Button
            className="side-menu-item add-form-input"
            startIcon={<TextFieldsTwoToneIcon />}
            size="large"
            onMouseDown={() => addFormInput("label")}
          >
            <ListItemText
              primary="Label"
              sx={{ paddingLeft: "10px", color: "text.secondary" }}
              disableTypography
            />
          </Button>
        </ListItem>

        <ListItem>
          <Button
            className="side-menu-item add-form-input"
            startIcon={<Crop169TwoToneIcon />}
            size="large"
            onMouseDown={() => addFormInput("single-line-text")}
          >
            <ListItemText
              primary="Single line input"
              sx={{ paddingLeft: "10px", color: "text.secondary" }}
              disableTypography
            />
          </Button>
        </ListItem>

        <ListItem>
          <Button
            className="side-menu-item add-form-input"
            startIcon={<LockTwoToneIcon />}
            size="large"
            onMouseDown={() => addFormInput("password")}
          >
            <ListItemText
              primary="Password"
              sx={{ paddingLeft: "10px", color: "text.secondary" }}
              disableTypography
            />
          </Button>
        </ListItem>

        <ListItem>
          <Button
            className="side-menu-item add-form-input"
            startIcon={<Crop75TwoToneIcon />}
            size="large"
            onMouseDown={() => addFormInput("multi-line-text")}
          >
            <ListItemText
              primary="Multi line input"
              sx={{ paddingLeft: "10px", color: "text.secondary" }}
              disableTypography
            />
          </Button>
        </ListItem>
        <ListItem>
          <Button
            className="side-menu-item add-form-input"
            startIcon={<CheckBoxTwoToneIcon />}
            size="large"
            onMouseDown={() => addFormInput("checkbox")}
          >
            <ListItemText
              primary="Checkbox"
              sx={{ paddingLeft: "10px", color: "text.secondary" }}
              disableTypography
            />
          </Button>
        </ListItem>

        <ListItem>
          <Button
            className="side-menu-item add-form-input"
            startIcon={<RadioButtonCheckedTwoToneIcon />}
            size="large"
            onMouseDown={() => addFormInput("radio")}
          >
            <ListItemText
              primary="Radio"
              sx={{ paddingLeft: "10px", color: "text.secondary" }}
              disableTypography
            />
          </Button>
        </ListItem>

        <ListItem>
          <Button
            className="side-menu-item add-form-input"
            startIcon={<DateRangeTwoToneIcon />}
            size="large"
            onMouseDown={() => addFormInput("date")}
          >
            <ListItemText
              primary="Date"
              sx={{ paddingLeft: "10px", color: "text.secondary" }}
              disableTypography
            />
          </Button>
        </ListItem>

        <ListItem>
          <Button
            className="side-menu-item add-form-input"
            startIcon={<ArrowDropDownTwoToneIcon />}
            size="large"
            onMouseDown={() => addFormInput("dropdown")}
          >
            <ListItemText
              primary="Dropdown"
              sx={{ paddingLeft: "10px", color: "text.secondary" }}
              disableTypography
            />
          </Button>
        </ListItem>

        {/*<ListItem>*/}
        {/*  <Button*/}
        {/*    className="side-menu-item add-form-input"*/}
        {/*    startIcon={<ArrowDropDownCircleTwoToneIcon />}*/}
        {/*    size="large"*/}
        {/*    onClick={() => addFormInput("multi-select-dropdown")}*/}
        {/*  >*/}
        {/*    <ListItemText*/}
        {/*      primary="Multi-Dropdown"*/}
        {/*      sx={{ paddingLeft: "10px", color: "text.secondary" }}*/}
        {/*      disableTypography*/}
        {/*    />*/}
        {/*  </Button>*/}
        {/*</ListItem>*/}

        <ListItem>
          <Button
            className="side-menu-item add-form-input"
            startIcon={<FileUploadTwoToneIcon />}
            size="large"
            onMouseDown={() => addFormInput("file-upload")}
          >
            <ListItemText
              primary="File-Upload"
              sx={{ paddingLeft: "10px", color: "text.secondary" }}
              disableTypography
            />
          </Button>
        </ListItem>

        <Divider sx={{ marginY: "20px" }} />
        <ListItem className="side-menu-heading">Premium features</ListItem>
        <ListItem>
          <Button
            className="side-menu-item"
            startIcon={<AutoAwesomeTwoToneIcon />}
            size="large"
            onMouseDown={() => openAiModal()}
          >
            <ListItemText
              primary="AI Assistant"
              sx={{ paddingLeft: "10px", color: "text.secondary" }}
              disableTypography
            />
          </Button>
        </ListItem>
      </List>
      <LogoutButton />
      <AiPromptModal isOpen={isAiModalVisible} onClose={closeAiModal} />
    </Box>
  );

  return (
    <>
      <Drawer
        variant="permanent"
        open
        anchor="left"
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: menuWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: menuWidth, overflowX: "hidden" }, // Ensure horizontal overflow is hidden for Drawer paper
        }}
      >
        <img
          src={Logo}
          alt="Formulate"
          style={{
            width: "40px",
            height: "40px",
            margin: "30px 40px",
            cursor: "pointer",
            transition: "transform 0.3s ease-in-out",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.3)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
          onClick={() => {
            window.location.href = "/dashboard";
          }}
        />
        {DrawerList}
      </Drawer>
      <AiPromptModal open={isAiModalVisible} onClose={closeAiModal} />
    </>
  );
}

export default SideMenuFormEditor;
