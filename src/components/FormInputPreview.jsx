import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import CloudUploadTwoToneIcon from "@mui/icons-material/CloudUploadTwoTone";
import { CurrentFormSchemaContext } from "./routes/FormRoute";
import { useContext } from "react";

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

function FormInputPreview({ field }) {
  const renderInputField = (field) => {
    let isRequired = false;
    if (field.validation) {
      isRequired = field.validation.isRequired;
    }

    switch (field.type) {
      case "label":
        return <Typography variant="h6">{field.label}</Typography>;

      case "single-line-text":
        return (
          <TextField
            label={field.label}
            id={field.name}
            required={isRequired}
            sx={{ width: "300px" }}
          />
        );

      case "password":
        return (
          <TextField
            label={field.label}
            id={field.name}
            type="password"
            required={isRequired}
            sx={{ width: "300px" }}
          />
        );

      case "multi-line-text":
        return (
          <TextField
            label={field.label}
            id={field.name}
            multiline
            rows={4}
            required={isRequired}
            sx={{ width: "300px" }}
          />
        );

      case "checkbox":
        return (
          <FormControl>
            <FormLabel
              id={field.name}
              sx={{
                cursor: "pointer",
                marginBottom: "10px",
              }}
              required={isRequired}
            >
              <Typography variant="h6" sx={{ display: "inline" }}>
                {field.label}
              </Typography>
            </FormLabel>
            <FormGroup sx={{ width: "300px" }}>
              {field.options.map((option) => (
                <Box
                  sx={{ display: "flex", alignItems: "center" }}
                  key={option.id}
                >
                  <FormControlLabel
                    control={<Checkbox />}
                    label={<Typography variant="body1">{option.value}</Typography>}
                    sx={{
                      width: "100%",
                      cursor: "pointer",
                    }}
                  />
                </Box>
              ))}
            </FormGroup>
          </FormControl>
        );

      case "radio":
        return (
          <FormControl>
            <FormLabel
              id={field.name}
              required={isRequired}
              sx={{
                cursor: "pointer",
                marginBottom: "10px",
              }}
            >
              <Typography variant="h6" sx={{ display: "inline" }}>
                {field.label}
              </Typography>
            </FormLabel>
            <RadioGroup
              aria-labelledby={field.name}
              name={field.name}
              sx={{ width: "300px" }}
            >
              {field.options.map((option) => (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FormControlLabel
                    value={option.value}
                    control={<Radio />}
                    label={option.value}
                    key={option.id}
                    sx={{
                      width: "100%",
                    }}
                  />
                </Box>
              ))}
            </RadioGroup>
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
          <FormControl sx={{ width: "300px" }}>
            <InputLabel id={"label-" + field.name} required={isRequired}>
              {field.label}
            </InputLabel>
            <Select
              labelId={"label-" + field.name}
              id={field.name}
              label={field.label}
            >
              {field.options.map((option, index) => (
                <MenuItem value={option.value} key={option.id}>
                  {option.value}
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
              <FormLabel id={field.name} sx={{ mb: 1 }} required={isRequired}>
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

  return <Box sx={{ marginBottom: "20px" }}>{renderInputField(field)}</Box>;
}

export default FormInputPreview;
