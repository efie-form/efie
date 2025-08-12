import type { Operator } from '@efie-form/core';
import { StyledSelect } from '../../../../../components/form';

interface OperatorSelectProps {
  value?: Operator;
  options: { value: Operator; label: string }[];
  onChange: (op: Operator) => void;
}

const OperatorSelect = ({ value, options, onChange }: OperatorSelectProps) => {
  return <StyledSelect options={options} value={value} onChange={onChange} searchable />;
};

export default OperatorSelect;
