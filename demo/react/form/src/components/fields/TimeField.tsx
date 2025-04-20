import type { TimeFieldProps } from '@efie-form/react';
import { TimePicker } from '@mui/x-date-pickers';
import { useFormContext } from 'react-hook-form';

function TimeField({ fieldLabel, name }: TimeFieldProps) {
  const { register } = useFormContext();

  return (
    <div>
      <TimePicker
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

export default TimeField;
