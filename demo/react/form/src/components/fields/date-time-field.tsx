import type { DateTimeFieldProps } from '@efie-form/react';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useFormContext } from 'react-hook-form';

function DateTimeField({ fieldLabel, name }: DateTimeFieldProps) {
  const { register } = useFormContext();

  return (
    <div>
      <DateTimePicker
        {...register(name)}
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
