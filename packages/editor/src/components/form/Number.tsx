import type { InputProps } from './Input.tsx';
import Input from './Input.tsx';

interface NumberProps extends Omit<InputProps, 'value' | 'onChange'> {
  value: number;
  onChange: (value: number) => void;
}

function Number({ inputProps, value, onChange, ...props }: NumberProps) {
  return (
    <Input
      {...props}
      value={value.toString()}
      onChange={(newValue) => {
        onChange(parseInt(newValue, 10));
      }}
      inputProps={{
        type: 'number',
        ...inputProps,
      }}
    />
  );
}

export default Number;
