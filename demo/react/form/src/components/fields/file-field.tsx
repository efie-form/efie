import type { FileFieldProps } from '@efie-form/react';
import { Box } from '@mui/material';

function FileField({ id, fieldLabel }: FileFieldProps) {
  return (
    <Box
      sx={{
        marginTop: '1rem',
      }}
    >
      <label htmlFor={id}>{fieldLabel}</label>
      <input type="file" id={id} />
    </Box>
  );
}

export default FileField;
