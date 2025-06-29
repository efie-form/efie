import type { DateFieldProps } from '@efie-form/react';
import { DatePicker } from '@mui/x-date-pickers';

function DateField({ fieldLabel }: DateFieldProps) {
  return (
    <div>
      <DatePicker
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

export default DateField;
