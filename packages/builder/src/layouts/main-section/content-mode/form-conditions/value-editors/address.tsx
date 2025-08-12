import { Input } from '../../../../../components/form';

interface Props {
  value: unknown;
  onChange: (v: unknown) => void;
}

const AddressValueEditor = ({ value, onChange }: Props) => {
  return (
    <Input
      value={typeof value === 'string' ? value : ''}
      onChange={onChange}
      placeholder="Comma-separated list (e.g. US, CA)"
    />
  );
};

export default AddressValueEditor;
