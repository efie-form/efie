import type { InputProps } from './input';
import Input from './input';

interface NumberProps extends Omit<InputProps, 'value' | 'onChange'> {
  value?: number;
  onChange?: (value?: number) => void;
}

function NumberInput({ inputProps, value, onChange, ...props }: NumberProps) {
  return (
    <Input
      {...props}
      value={isEmpty(value) ? '' : value?.toString()}
      onChange={(newValue) => {
        if (!onChange) return; // uncontrolled
        if (isEmpty(newValue)) {
          onChange();
        } else {
          onChange(Number.parseInt(newValue, 10));
        }
      }}
      inputProps={{
        type: 'number',
        ...inputProps,
      }}
    />
  );
}

export default NumberInput;

function isEmpty(value?: string | number | null) {
  return value === undefined || value === null || value === '';
}
