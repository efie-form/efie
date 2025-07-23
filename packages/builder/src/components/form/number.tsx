import type { InputProps } from './input';
import Input from './input';

interface NumberProps extends Omit<InputProps, 'value' | 'onChange'> {
  value?: number;
  onChange: (value?: number) => void;
}

function NumberInput({ inputProps, value, onChange, ...props }: NumberProps) {
  return (
    <Input
      {...props}
      value={value?.toString()}
      onChange={(newValue) => {
        if (newValue === undefined || newValue === '') {
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
