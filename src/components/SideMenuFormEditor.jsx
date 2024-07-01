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
  CurrentFormSchemaContext,
} from "./routes/FormRoute";
import Logo from "../assets/logo.svg";

import {
  TextFieldsTwoTone as TextFieldsTwoToneIcon,
  Crop75TwoTone as Crop75TwoToneIcon,
  Crop169TwoTone as Crop169TwoToneIcon,
  CheckBoxTwoTone as CheckBoxTwoToneIcon,
  RadioButtonCheckedTwoTone as RadioButtonCheckedTwoToneIcon,
  DateRangeTwoTone as DateRangeTwoToneIcon,
  ArrowDropDownTwoTone as ArrowDropDownTwoToneIcon,
  FileUploadTwoTone as FileUploadTwoToneIcon,
  AutoAwesomeTwoTone as AutoAwesomeTwoToneIcon,
  HomeTwoTone as HomeTwoToneIcon,
  LockTwoTone as LockTwoToneIcon,
} from "@mui/icons-material";

import { v4 as uuidv4 } from 'uuid';

import AiPromptModal from "./AiPromptModal";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";

const inputComponents = [
  { type: "label", label: "Label", icon: TextFieldsTwoToneIcon },
  { type: "single-line-text", label: "Single line input", icon: Crop169TwoToneIcon },
  { type: "password", label: "Password", icon: LockTwoToneIcon },
  { type: "multi-line-text", label: "Multi line input", icon: Crop75TwoToneIcon },
  { type: "checkbox", label: "Checkbox", icon: CheckBoxTwoToneIcon },
  { type: "radio", label: "Radio", icon: RadioButtonCheckedTwoToneIcon },
  { type: "date", label: "Date", icon: DateRangeTwoToneIcon },
  { type: "dropdown", label: "Dropdown", icon: ArrowDropDownTwoToneIcon },
  { type: "file-upload", label: "File upload", icon: FileUploadTwoToneIcon },
];

function SideMenuFormEditor() {
  const navigate = useNavigate();
  const { schema, setSchema } = useContext(CurrentFormSchemaContext);
  const [isAiModalVisible, setIsAiModalVisible] = useState(false);

  const openAiModal = () => setIsAiModalVisible(true);
  const closeAiModal = () => setIsAiModalVisible(false);

  const generateOptionsWithId = (options) => options.map((option, index) => ({ ...option, id: uuidv4() }));

  const addFormInput = (component) => {
    const baseComponent = {
      label: component.label,
      name: `${component.type}${schema.fields ? schema.fields.length : 0}`,
      type: component.type,
      validation: {
        message: "Invalid input",
        pattern: ".*",
        isRequired: false,
      },
    };

    if (["checkbox", "radio", "dropdown", "multi-select-dropdown"].includes(component.type)) {
      baseComponent.options = generateOptionsWithId([{ value: "Option 1" }, { value: "Option 2" }, { value: "Option 3" }]);
    }

    if (component.type === "file-upload") {
      baseComponent.validation["file-types"] = ["*"];
    }

    setSchema((prevSchema) => ({
      ...prevSchema,
      fields: [...(prevSchema.fields || []), baseComponent],
    }));
  };

  const menuWidth = 300;

  const DrawerList = (
    <Box sx={{ overflow: "hidden", height: "100vh" }} role="presentation">
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
        {inputComponents.map((component) => (
          <ListItem key={component.type}>
            <Button
              className="side-menu-item add-form-input"
              startIcon={<component.icon />}
              size="large"
              onMouseDown={() => addFormInput(component)}
            >
              <ListItemText
                primary={component.label}
                sx={{ paddingLeft: "10px", color: "text.secondary" }}
                disableTypography
              />
            </Button>
          </ListItem>
        ))}

        <Divider sx={{ marginY: "20px" }} />
        <ListItem className="side-menu-heading">Premium features</ListItem>
        <ListItem>
          <Button
            className="side-menu-item"
            startIcon={<AutoAwesomeTwoToneIcon />}
            size="large"
            onMouseDown={openAiModal}
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
        ModalProps={{ keepMounted: true }}
        sx={{
          width: menuWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: menuWidth, overflowX: "hidden" },
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
