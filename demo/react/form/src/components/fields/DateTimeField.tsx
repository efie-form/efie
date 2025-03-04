import type { DateTimeFieldProps } from '@efie-form/react';
import { DateTimePicker } from '@mui/x-date-pickers';

function DateTimeField({ label }: DateTimeFieldProps) {
  return (
    <div>
      <DateTimePicker
        slotProps={{
          textField: {
            fullWidth: true,
            variant: 'outlined',
            size: 'small',
            label,
          },
        }}
      />
    </div>
  );
}

export default DateTimeField;
