import type { MultipleChoicesFieldProps } from '@efie-form/react';
import { MenuItem, Select } from '@mui/material';

function MultipleChoicesField({
  id,
  fieldLabel,
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
      label={fieldLabel}
    >
      {options.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.optionLabel}
        </MenuItem>
      ))}
    </Select>
  );
}

export default MultipleChoicesField;
