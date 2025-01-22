import { MultipleChoicesFieldProps } from '@efie-form/react';
import { MenuItem, Select } from '@mui/material';

function MultipleChoicesField({
  id,
  label,
  options,
}: MultipleChoicesFieldProps) {
  return (
    <Select
      id={id}
      size="small"
      value={[]}
      fullWidth
      variant="outlined"
      multiple
      label={label}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}

export default MultipleChoicesField;
