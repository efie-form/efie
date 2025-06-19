import { useCallback } from 'react';
import { useSchemaStore } from '../../../lib/state/schema.state';
import SettingsFieldVertical from '../property-layouts/settings-field-vertical';
import { Input } from '../../../components/form';
import type { PropSettingsFormKey } from '../../../types/prop-settings.type';

interface PropsSettingsFormKeyProps extends PropSettingsFormKey {
  fieldId: string;
}

export default function PropsSettingsFormKey({ fieldId }: PropsSettingsFormKeyProps) {
  const field = useSchemaStore(
    useCallback(state => state.getFieldById(fieldId), [fieldId]),
  );
  const updateFieldProperty = useSchemaStore(state => state.updateField);

  if (!field || !('form' in field) || !field.form) {
    return <></>;
  }

  const onChange = useCallback(
    (newKey: string) => {
      updateFieldProperty(fieldId, {
        form: {
          ...field.form,
          key: newKey,
        },
      });
    },
    [fieldId, field.form, updateFieldProperty],
  );

  return (
    <SettingsFieldVertical label="Form Key" divider>
      <Input
        placeholder="Enter form key"
        value={field.form.key || ''}
        onChange={onChange}
      />
    </SettingsFieldVertical>
  );
}
