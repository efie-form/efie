import type { MultipleChoicesFieldProps } from '@efie-form/react';
import { MenuItem, Select } from '@mui/material';
import { useFormContext } from 'react-hook-form';

function MultipleChoicesField({
  id,
  fieldLabel,
  options,
  name,
}: MultipleChoicesFieldProps) {
  const { register } = useFormContext();

  return (
    <Select
      id={id}
      {...register(name)}
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
