import type { MultipleChoicesFieldProps } from '@efie-form/react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const size = 'small';

function MultipleChoicesField({
  id,
  fieldLabel,
  options,
}: MultipleChoicesFieldProps) {
  return (
    <FormControl>
      <InputLabel id={`${id}-label`} size={size}>
        {fieldLabel}
      </InputLabel>
      <Select
        id={id}
        labelId={`${id}-label`}
        size={size}
        fullWidth
        variant="outlined"
        label={fieldLabel}
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.optionLabel}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default MultipleChoicesField;
