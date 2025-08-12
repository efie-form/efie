import { Input, StyledSelect } from '../../../../../components/form';

interface OptionItem {
  value: string;
  label: string;
}

interface Props {
  value: unknown;
  onChange: (v: unknown) => void;
  options: OptionItem[];
  multiple?: boolean;
}

const ChoiceValueEditor = ({ value, onChange, options, multiple }: Props) => {
  if (multiple) {
    return (
      <Input
        value={typeof value === 'string' ? value : ''}
        onChange={onChange}
        placeholder="Option values (comma-separated)"
      />
    );
  }

  return (
    <StyledSelect
      options={options.map((o) => ({ value: o.value, label: o.label }))}
      value={(typeof value === 'string' ? value : undefined) as string | undefined}
      onChange={onChange}
      searchable
    />
  );
};

export default ChoiceValueEditor;
