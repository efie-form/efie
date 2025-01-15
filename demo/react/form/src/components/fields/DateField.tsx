import type { DateFieldProps } from '@efie-form/react/types/FieldProps.ts';
import { DatePicker } from '@mui/x-date-pickers';

function DateField({ label }: DateFieldProps) {
  return (
    <div>
      <DatePicker
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

export default DateField;
