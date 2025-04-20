import type { DateFieldProps } from '@efie-form/react/types/FieldProps.ts';
import { DatePicker } from '@mui/x-date-pickers';
import { useFormContext } from 'react-hook-form';

function DateField({ fieldLabel, name }: DateFieldProps) {
  const { register } = useFormContext();

  return (
    <div>
      <DatePicker
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

export default DateField;
