import { type FormField } from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { useSettingsStore } from '../../../lib/state/settings.state';
import { useControllableState } from '../../../lib/hooks/useControllableState';
import { Input } from '../../../components/form';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical';

interface PropSettingsFormKeyProps {
  field: FormField;
}

export default function PropSettingsFormKey({
  field,
}: PropSettingsFormKeyProps) {
  const { updateFieldForm } = useSchemaStore();
  const { formKeyEditable } = useSettingsStore();
  const [formKey, setFormKey] = useControllableState({
    onChange: (value) => {
      updateFieldForm(field.id, {
        ...field.form,
        key: value,
      });
    },
    defaultValue: field.form?.key || '',
  });

  return (
    <SettingsFieldVertical label="Form key" divider>
      <Input
        value={formKey}
        onChange={(value) => {
          setFormKey(value);
        }}
        disabled={!formKeyEditable}
      />
    </SettingsFieldVertical>
  );
}
