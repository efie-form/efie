import type { FormFieldShortText } from '@efie-form/core';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical.tsx';
import Input from '../../../components/form/Input.tsx';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal.tsx';
import Switch from '../../../components/form/Switch.tsx';
import { useSchemaStore } from '../../../lib/state/schema.state.ts';
import ContainerSettingsGroup from '../common/ContainerSettingsGroup.tsx';

interface ShortTextSettingsProps {
  field: FormFieldShortText;
}

function ShortTextSettings({ field }: ShortTextSettingsProps) {
  const { getFieldKeyById, updateFieldProps } = useSchemaStore();
  const fieldKey = getFieldKeyById(field.id);
  if (!fieldKey) return null;

  return (
    <div>
      <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body3 uppercase">
        General
      </div>
      <SettingsFieldVertical label="Label" divider>
        <Input
          value={field.props.label}
          onChange={(newValue) => {
            updateFieldProps(field.id, 'props.label', newValue);
          }}
        />
      </SettingsFieldVertical>
      <SettingsFieldVertical label="Placeholder" divider>
        <Input
          value={field.props.placeholder}
          onChange={(newValue) => {
            updateFieldProps(field.id, 'props.placeholder', newValue);
          }}
        />
      </SettingsFieldVertical>
      <SettingsFieldHorizontal label="Required">
        <Switch
          checked={field.props.required}
          onChange={() => {
            updateFieldProps(field.id, 'props.required', !field.props.required);
          }}
        />
      </SettingsFieldHorizontal>

      <ContainerSettingsGroup field={field} />
    </div>
  );
}

export default ShortTextSettings;
