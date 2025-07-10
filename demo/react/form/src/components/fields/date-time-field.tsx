import type { DateTimeFieldProps } from '@efie-form/react';
import { DateTimePicker } from '@mui/x-date-pickers';

function DateTimeField({ fieldLabel }: DateTimeFieldProps) {
  return (
    <div>
      <DateTimePicker
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

export default DateTimeField;
