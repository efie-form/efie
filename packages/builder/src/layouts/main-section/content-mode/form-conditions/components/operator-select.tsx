import type { Operator } from '@efie-form/core';
import { StyledSelect } from '../../../../../components/form';

interface OperatorSelectProps {
  value?: Operator;
  options: { value: Operator; label: string }[];
  onChange: (op: Operator) => void;
  disabled?: boolean;
}

const OperatorSelect = ({ value, options, onChange, disabled }: OperatorSelectProps) => {
  return (
    <StyledSelect
      options={options}
      value={value}
      onChange={onChange}
      searchable
      disabled={disabled}
    />
  );
};

export default OperatorSelect;
