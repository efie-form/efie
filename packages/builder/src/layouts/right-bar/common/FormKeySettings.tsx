import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical';
import { useSettingsStore } from '../../../lib/state/settings.state';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { Input } from '../../../components/form';

interface FormKeySettingsProps {
  fieldId: string;
  value: string;
}

export default function FormKeySettings({
  fieldId,
  value,
}: FormKeySettingsProps) {
  const { formKeyEditable } = useSettingsStore();
  const { updateFieldProps } = useSchemaStore();

  return (
    <SettingsFieldVertical label="Field ID" divider>
      <Input
        onChange={value => updateFieldProps(fieldId, 'form.key', value)}
        value={value}
        disabled={!formKeyEditable}
      />
    </SettingsFieldVertical>
  );
}
