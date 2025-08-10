import { StyledSelect } from '../../../../components/form';
import { useSchemaStore } from '../../../../lib/state/schema.state';

interface FieldsSelectProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function FieldsSelect({ value, onChange }: FieldsSelectProps) {
  const allFields = useSchemaStore((state) => state.getAllFields());
  const options = allFields.map((field) => ({
    label: field.id,
    value: field.id,
  }));

  return <StyledSelect options={options} value={value} onChange={onChange} />;
}
