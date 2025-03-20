import type { FormFieldShortText } from '@efie-form/core';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical';
import Input from '../../../components/form/Input';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';
import Switch from '../../../components/form/Switch';
import { useSchemaStore } from '../../../lib/state/schema.state';
import FormKeySettings from '../common/FormKeySettings';
import SettingsFieldRegex from '../property-layouts/SettingsFieldRegex';

interface ShortTextSettingsProps {
  field: FormFieldShortText;
}

function ShortTextSettings({ field }: ShortTextSettingsProps) {
  const { getFieldKeyById, updateFieldProps } = useSchemaStore();
  const fieldKey = getFieldKeyById(field.id);
  if (!fieldKey) return <></>;

  return (
    <div>
      <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body3 uppercase">
        General
      </div>
      <FormKeySettings fieldId={field.id} value={field.form.key} />
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
      <SettingsFieldHorizontal label="Required" divider>
        <Switch
          checked={field.props.required}
          onChange={() => {
            updateFieldProps(field.id, 'props.required', !field.props.required);
          }}
        />
      </SettingsFieldHorizontal>
      <SettingsFieldRegex label="Match pattern" field={field} divider />
    </div>
  );
}

export default ShortTextSettings;
