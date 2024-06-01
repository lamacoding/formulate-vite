import React from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup, FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField
} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";

function renderInputField(field) {
  let isRequired = false;
  if (field.validation) {
    isRequired = field.validation.isRequired;
  }

  switch (field.type) {
    case "label":
      return (<p>{field.label}</p>);

    case "single-line-text":
      return (<TextField fullWidth={true} label={field.label}
                         id={field.name}
                         required={isRequired}/>);

    case "password":
      return (<TextField label={field.label}
                         id={field.name}
                         type="password"
                         required={isRequired}/>);

    case "multi-line-text":
      return (<TextField fullWidth={true}
                         label={field.label}
                         id={field.name}
                         multiline
                         rows={4}
                         required={isRequired}/>);

    case "checkbox":
      return (
        <FormGroup>
          {field.options.map(option => (
            <FormControlLabel
              control={<Checkbox/>}
              label={option}
              key={option.name}
            />
          ))}
        </FormGroup>
      )

    case "radio":
      return (
        <FormControl fullWidth={true}>
          <FormLabel id={field.name}>{field.label}</FormLabel>
          <RadioGroup aria-labelledby={field.name} name={field.name}>
            {field.options.map(option => (
              <FormControlLabel
                value={option}
                control={<Radio/>} label={option}
                key={option.name}></FormControlLabel>
            ))}
          </RadioGroup>
        </FormControl>
      )

    case "date":
      return <DatePicker format="DD.MM.YYYY" label={field.label + (isRequired && " *")}/>;

    case "dropdown":
      return (
        <FormControl fullWidth={true}>
          <InputLabel id="demo-simple-select-label">{field.label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label={field.label}
          >
            {field.options.map((option, index) => (
                <MenuItem value={option} key={index}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )
        ;

    case "multi-select-dropdown":
      return null;

    case "file-upload":
      return null;

    default:
      return null;
  }
}

function FormInput({field, id}) {
  return (
    <>
      {renderInputField(field)}
    </>
  );
}

export default FormInput;