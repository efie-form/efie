import { StyledSelect } from '../../../../../components/form';

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
  const mapped = options.map((o) => ({ value: o.value, label: o.label }));

  if (multiple) {
    const arr = Array.isArray(value)
      ? value.filter((v): v is string => typeof v === 'string')
      : typeof value === 'string'
        ? [value]
        : [];
    return (
      <StyledSelect
        options={mapped}
        value={arr}
        // StyledSelect when multiple expects string[]
        onChange={(vals) => onChange(vals)}
        searchable
        multiple
      />
    );
  }

  return (
    <StyledSelect
      options={mapped}
      value={typeof value === 'string' ? value : undefined}
      onChange={(val) => onChange(val)}
      searchable
    />
  );
};

export default ChoiceValueEditor;
