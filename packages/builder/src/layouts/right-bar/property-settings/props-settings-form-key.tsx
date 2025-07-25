import { Input } from '../../../components/form';
import { useSchemaStore } from '../../../lib/state/schema.state';
import type { PropSettingsFormKey } from '../../../types/prop-settings.type';
import SettingsFieldVertical from '../property-layouts/settings-field-vertical';

interface PropsSettingsFormKeyProps extends PropSettingsFormKey {
  fieldId: string;
}

export default function PropsSettingsFormKey({ fieldId }: PropsSettingsFormKeyProps) {
  const field = useSchemaStore((state) => state.getFieldById(fieldId));
  const updateFieldProperty = useSchemaStore((state) => state.updateField);

  if (!field || !('form' in field) || !field.form) {
    return <></>;
  }

  const onChange = (newKey: string) => {
    updateFieldProperty(fieldId, {
      form: {
        ...field.form,
        key: newKey,
      },
    });
  };

  return (
    <SettingsFieldVertical label="Form Key" divider>
      <Input placeholder="Enter form key" value={field.form.key || ''} onChange={onChange} />
    </SettingsFieldVertical>
  );
}
