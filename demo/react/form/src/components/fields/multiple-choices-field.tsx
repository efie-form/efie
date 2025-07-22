import type { MultipleChoicesFieldProps } from '@efie-form/react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';

const size = 'small';

function MultipleChoicesField({ id, fieldLabel, options }: MultipleChoicesFieldProps) {
  const [value, setValue] = useState<string[]>([]);
  return (
    <FormControl
      fullWidth
      sx={{
        marginTop: '1rem',
      }}
    >
      <InputLabel id={`${id}-label`} size={size}>
        {fieldLabel}
      </InputLabel>
      <Select
        id={id}
        value={value}
        onChange={(event) => setValue(event.target.value as string[])}
        labelId={`${id}-label`}
        size={size}
        fullWidth
        multiple
        variant="outlined"
        label={fieldLabel}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default MultipleChoicesField;
