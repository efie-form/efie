import type { TimeFieldProps } from '@efie-form/react';
import { TimePicker } from '@mui/x-date-pickers';

function TimeField({ fieldLabel }: TimeFieldProps) {
  return (
    <div>
      <TimePicker
        sx={{
          marginTop: '1rem',
        }}
        slotProps={{
          textField: {
            fullWidth: true,
            variant: 'outlined',
            size: 'small',
            label: fieldLabel,
          },
        }}
      />
    </div>
  );
}

export default TimeField;
