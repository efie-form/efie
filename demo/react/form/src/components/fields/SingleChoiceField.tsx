import type { SingleChoiceFieldProps } from '@efie-form/react';
import { MenuItem, Select } from '@mui/material';
import { useFormContext } from 'react-hook-form';

function SingleChoiceField({ fieldLabel, id, options, name }: SingleChoiceFieldProps) {
  const { watch, setValue } = useFormContext();

  return (
    <Select
      id={id}
      value={watch(name)}
      onChange={(e) => {
        setValue(name, e.target.value);
      }}
      size="small"
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
  );
}

export default SingleChoiceField;
