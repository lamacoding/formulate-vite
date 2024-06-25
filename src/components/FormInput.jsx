import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  InputLabel,
  ListItemIcon,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  styled,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import CloudUploadTwoToneIcon from "@mui/icons-material/CloudUploadTwoTone";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import RemoveCircleTwoToneIcon from "@mui/icons-material/RemoveCircleTwoTone";
import { useState } from "react";
import { CurrentFormSchemaContext } from "./routes/FormRoute";
import { useContext } from "react";
import EditFormInputPrompt from "./EditFormInputPrompt";
import { useRef } from "react";

// Used for 3-dot edit menu (from MaterialUI documentation)
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function FormInput({ field }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { schema, setSchema } = useContext(CurrentFormSchemaContext);
  const open = Boolean(anchorEl);
  const [editFormInputPrompt, setEditFormInputPrompt] = useState({
    visible: false,
    field: {},
  });
  const [labelClicked, setLabelClicked] = useState(false);
  const [optionClicked, setOptionClicked] = useState(null);
  const labelInputRef = useRef(null);
  const optionInputRef = useRef(null);

  const handleEditClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEditClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    const index = schema.fields.findIndex((f) => f.name === field.name);
    if (index !== -1) {
      schema.fields.splice(index, 1);
      setSchema({ ...schema });
    } else {
      console.error("Field not found");
    }
    handleEditClose();
  };

  const handleLabelClick = () => {
    setLabelClicked(true);
    setTimeout(() => {
      if (labelInputRef.current) {
        labelInputRef.current.focus();
      }
    }, 0);
  };

  const handleAddOption = () => {
    field.options.push("");
    setSchema({ ...schema });
  };

  const handleDeleteOption = (option) => {
    const index = field.options.findIndex((o) => o === option);
    if (index !== -1 && field.options.length > 1) {
      field.options.splice(index, 1);
      setSchema({ ...schema });
    } else {
      console.error("Option not found");
    }
  };

  const handleRenameOption = (option) => {
    setOptionClicked(option);
    setTimeout(() => {
      if (optionInputRef.current) {
        optionInputRef.current.focus();
      }
    }, 0);
  };

  const renderInputField = (field) => {
    let isRequired = false;
    if (field.validation) {
      isRequired = field.validation.isRequired;
    }

    switch (field.type) {
      case "label":
        return <p style={{ width: "100%" }}>{field.label}</p>;

      case "single-line-text":
        return (
          <TextField
            fullWidth={true}
            label={field.label}
            id={field.name}
            required={isRequired}
          />
        );

      case "password":
        return (
          <TextField
            label={field.label}
            id={field.name}
            type="password"
            required={isRequired}
            fullWidth={true}
          />
        );

      case "multi-line-text":
        return (
          <TextField
            fullWidth={true}
            label={field.label}
            id={field.name}
            multiline
            rows={4}
            required={isRequired}
          />
        );

      case "checkbox":
        return (
          <FormControl fullWidth={true}>
            {labelClicked ? (
              <TextField
                id={field.name}
                onBlur={() => setLabelClicked(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setLabelClicked(false);
                  }
                }}
                value={field.label}
                onChange={(e) => {
                  field.label = e.target.value;
                  setSchema({ ...schema });
                }}
                inputRef={labelInputRef}
                sx={{ width: "400px" }}
              >
                {field.label}
              </TextField>
            ) : (
              <FormLabel
                id={field.name}
                onMouseDown={handleLabelClick}
                sx={{
                  cursor: "pointer",
                  marginBottom: "10px",
                  ":hover": { color: "primary.main" },
                }}
              >
                {field.label}
              </FormLabel>
            )}
            <FormGroup sx={{ width: "300px" }}>
              {field.options.map((option) => (
                <Box
                  sx={{ display: "flex", alignItems: "center" }}
                  key={option}
                >
                  {optionClicked === option ? (
                    <TextField
                      value={option}
                      onBlur={() => setOptionClicked(null)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setOptionClicked(null);
                        }
                      }}
                      onChange={(e) => {
                        const index = field.options.indexOf(option);
                        if (index !== -1) {
                          field.options[index] = e.target.value;
                          setSchema({ ...schema });
                        }
                      }}
                      inputRef={optionInputRef}
                    />
                  ) : (
                    <>
                      <FormControlLabel
                        control={<Checkbox />}
                        label={option}
                        sx={{
                          width: "100%",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          e.nativeEvent.preventDefault();
                          handleRenameOption(option);
                        }}
                      />
                      <IconButton
                        onMouseDown={() => {
                          handleDeleteOption(option);
                        }}
                        sx={{
                          width: "40px",
                          height: "40px",
                          color: "error.main",
                          marginLeft: "10px",
                        }}
                      >
                        <RemoveCircleTwoToneIcon />
                      </IconButton>
                    </>
                  )}
                </Box>
              ))}
            </FormGroup>
            <Divider sx={{ width: "150px", marginY: 0, color: "#BABABA" }}>
              <IconButton
                onMouseDown={() => {
                  handleAddOption();
                }}
              >
                <AddCircleTwoToneIcon />
              </IconButton>
            </Divider>
          </FormControl>
        );

      case "radio":
        return (
          <FormControl fullWidth={true}>
            <FormLabel id={field.name}>{field.label}</FormLabel>
            <RadioGroup
              aria-labelledby={field.name}
              name={field.name}
              sx={{ width: "300px" }}
            >
              {field.options.map((option) => (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FormControlLabel
                    value={option}
                    control={<Radio />}
                    label={option}
                    key={option}
                    sx={{
                      width: "100%",
                    }}
                  />
                  <IconButton
                    sx={{
                      width: "40px",
                      height: "40px",
                      color: "error.main",
                      marginLeft: "10px",
                    }}
                  >
                    <RemoveCircleTwoToneIcon />
                  </IconButton>
                </Box>
              ))}
            </RadioGroup>
            <Divider sx={{ width: "150px", marginY: 0, color: "#BABABA" }}>
              <IconButton>
                <AddCircleTwoToneIcon />
              </IconButton>
            </Divider>
          </FormControl>
        );

      case "date":
        return (
          <DatePicker
            format="DD.MM.YYYY"
            label={field.label + (isRequired ? " *" : "")}
            sx={{ width: "100%" }}
          />
        );

      case "dropdown":
        return (
          <FormControl fullWidth={true}>
            <InputLabel id={"label-" + field.name}>{field.label}</InputLabel>
            <Select
              labelId={"label-" + field.name}
              id={field.name}
              label={field.label}
            >
              {field.options.map((option, index) => (
                <MenuItem value={option} key={index}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      // case "multi-select-dropdown":
      //   return (
      //     <FormControl fullWidth={true}>
      //       <InputLabel id={"label-" + field.name}>{field.label}</InputLabel>
      //       <Select
      //         labelId={"label-" + field.name}
      //         id={field.name}
      //         label={field.label}
      //         value={field.options.map((option) => ())}
      //         multiple
      //         renderValue={(option) => (option.join(", "))}
      //       >
      //         {field.options.map((option, index) => (
      //           <MenuItem value={option} key={index}>
      //             {option}
      //           </MenuItem>
      //         ))}
      //       </Select>
      //     </FormControl>
      //   );

      case "file-upload":
        return (
          <Box sx={{ width: "100%" }}>
            <FormControl>
              <FormLabel id={field.name} sx={{ mb: 1 }}>
                {field.label}
              </FormLabel>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadTwoToneIcon />}
              >
                Upload file
                <VisuallyHiddenInput type="file" />
              </Button>
            </FormControl>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {renderInputField(field)}
      <IconButton
        id={`more-button-${field.name}`}
        aria-controls={open ? `more-menu-${field.name}` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onMouseDown={handleEditClick}
        sx={{ marginLeft: 2 }}
      >
        <MoreVertTwoToneIcon />
      </IconButton>
      <Menu
        id={`more-menu-${field.name}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleEditClose}
        MenuListProps={{
          "aria-labelledby": `more-button-${field.name}`,
        }}
        sx={{ width: 320, maxWidth: "100%" }}
      >
        <MenuItem
          onMouseDown={() => {
            setEditFormInputPrompt({ visible: true, field: field });
            handleEditClose();
          }}
        >
          <ListItemIcon>
            <EditTwoToneIcon />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onMouseDown={handleDelete} sx={{ color: "error.main" }}>
          <ListItemIcon sx={{ color: "error.main" }}>
            <DeleteTwoToneIcon />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
      <EditFormInputPrompt
        isOpen={editFormInputPrompt.visible}
        onClose={() => setEditFormInputPrompt({ visible: false, field: {} })}
        field={editFormInputPrompt.field}
        initialValue={field.label}
      />
    </>
  );
}

export default FormInput;
