import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  InputLabel,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
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
import { useState } from "react";
import { CurrentFormSchemaContext } from "./routes/FormRoute";
import { useContext } from "react";

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    const index = schema.fields.findIndex(f => f.name === field.name);
    if (index !== -1) {
      schema.fields.splice(index, 1);
      setSchema({...schema}); 
    } else {
      console.log("Field not found");
    }
    handleClose();
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
            <FormLabel id={field.name}>{field.label}</FormLabel>
            <FormGroup sx={{ width: "100%" }}>
              {field.options.map((option) => (
                <FormControlLabel
                  control={<Checkbox />}
                  label={option}
                  key={option}
                />
              ))}
            </FormGroup>
          </FormControl>
        );

      case "radio":
        return (
          <FormControl fullWidth={true}>
            <FormLabel id={field.name}>{field.label}</FormLabel>
            <RadioGroup aria-labelledby={field.name} name={field.name}>
              {field.options.map((option) => (
                <FormControlLabel
                  value={option}
                  control={<Radio />}
                  label={option}
                  key={option}
                ></FormControlLabel>
              ))}
            </RadioGroup>
          </FormControl>
        );

      case "date":
        return (
          <DatePicker
            format="DD.MM.YYYY"
            label={field.label + (isRequired && " *")}
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
        onMouseDown={handleClick}
        sx={{ marginLeft: 2 }}
      >
        <MoreVertTwoToneIcon />
      </IconButton>
      <Menu
        id={`more-menu-${field.name}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": `more-button-${field.name}`,
        }}
        sx={{ width: 320, maxWidth: "100%" }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <EditTwoToneIcon />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <ListItemIcon sx={{ color: "error.main" }}>
            <DeleteTwoToneIcon />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}

export default FormInput;
