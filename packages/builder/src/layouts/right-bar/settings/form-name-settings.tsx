import { Input } from '../../../components/form';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { useSettingsStore } from '../../../lib/state/settings.state';
import SettingsFieldVertical from '../property-layouts/settings-field-vertical';

interface FieldNameSettingsProps {
  fieldId: string;
}

export default function FieldNameSettings({ fieldId }: FieldNameSettingsProps) {
  const fieldNameEditable = useSettingsStore((state) => state.fieldNameEditable);
  const fieldName = useSchemaStore((state) => state.getFieldName(fieldId)) || '';
  const setFieldName = useSchemaStore((state) => state.setFieldName);

  if (!fieldNameEditable) return null;

  return (
    <SettingsFieldVertical label="Form Input Name" divider>
      <Input value={fieldName} onChange={(newValue) => setFieldName(fieldId, newValue)} />
    </SettingsFieldVertical>
  );
}
