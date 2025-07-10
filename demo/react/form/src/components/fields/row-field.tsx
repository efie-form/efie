import type { RowFieldProps } from '@efie-form/react';
import { Box } from '@mui/material';

function RowField({ children }: RowFieldProps) {
  return (
    <Box
      sx={{
        marginTop: '1rem',
        display: 'flex',
        flexDirection: 'row',
        gap: '1rem',
      }}
    >
      {children}
    </Box>
  );
}

export default RowField;
