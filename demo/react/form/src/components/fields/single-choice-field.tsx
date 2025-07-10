import type { SingleChoiceFieldProps } from '@efie-form/react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const size = 'small';

function SingleChoiceField({ fieldLabel, id, options }: SingleChoiceFieldProps) {
  const labelId = `${id}-label`;

  return (
    <FormControl
      fullWidth
      sx={{
        marginTop: '1rem',
      }}
    >
      <InputLabel id={labelId} size={size}>
        {fieldLabel}
      </InputLabel>

      <Select
        id={id}
        labelId={labelId}
        size={size}
        fullWidth
        variant="outlined"
        label={fieldLabel}
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SingleChoiceField;
