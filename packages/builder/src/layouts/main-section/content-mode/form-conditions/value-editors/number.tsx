import { Number as NumberInput } from '../../../../../components/form';

interface Props {
  value: unknown;
  onChange: (v: unknown) => void;
}

const NumberValueEditor = ({ value, onChange }: Props) => {
  return (
    <NumberInput
      value={typeof value === 'number' ? value : undefined}
      onChange={onChange}
      placeholder="e.g. 10"
    />
  );
};

export default NumberValueEditor;
