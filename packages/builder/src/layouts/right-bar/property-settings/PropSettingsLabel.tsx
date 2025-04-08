import { type FormField } from '@efie-form/core';
import { Input } from '../../../components/form';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical';
import { useFieldLabel } from '../../../lib/hooks/properties/useFieldLabel';

interface PropSettingsLabelProps {
  field: FormField;
}

export default function PropSettingsLabel({ field }: PropSettingsLabelProps) {
  const { label, updateLabel } = useFieldLabel(field);

  return (
    <SettingsFieldVertical label="Label" divider>
      <Input value={label} onChange={updateLabel} />
    </SettingsFieldVertical>
  );
}
