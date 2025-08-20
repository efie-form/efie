import { Select } from '../../../../../components/form';

interface Props {
  value: unknown;
  onChange: (v: unknown) => void;
}

const BooleanValueEditor = ({ value, onChange }: Props) => {
  return (
    <Select
      value={(typeof value === 'string' ? value : '') as 'true' | 'false'}
      onChange={onChange}
      options={[
        { value: 'true', label: 'True' },
        { value: 'false', label: 'False' },
      ]}
    />
  );
};

export default BooleanValueEditor;
