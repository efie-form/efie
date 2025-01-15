import { TimeFieldProps } from '@efie-form/react';
import { TimePicker } from '@mui/x-date-pickers';

function TimeField({ label }: TimeFieldProps) {
  return (
    <div>
      <TimePicker
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

export default TimeField;
