import type { FormFieldSingleChoice } from '@efie-form/core';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical';
import Input from '../../../components/form/Input';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';
import Switch from '../../../components/form/Switch';
import SettingsFieldOptionsValue from '../property-layouts/SettingsFieldOptionsValue';
import { useSchemaStore } from '../../../lib/state/schema.state';
import ContainerSettingsGroup from '../common/ContainerSettingsGroup';

interface SingleChoiceSettingsProps {
  field: FormFieldSingleChoice;
}

function SingleChoiceSettings({ field }: SingleChoiceSettingsProps) {
  const { updateFieldProps } = useSchemaStore();

  return (
    <div>
      <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body3 uppercase">
        General
      </div>
      <SettingsFieldVertical label="Form key" divider>
        <Input
          onChange={(value) => updateFieldProps(field.id, 'form.key', value)}
          value={field.form.key}
        />
      </SettingsFieldVertical>
      <SettingsFieldVertical label="Label" divider>
        <Input
          onChange={(value) => updateFieldProps(field.id, 'props.label', value)}
          value={field.props.label}
        />
      </SettingsFieldVertical>
      <SettingsFieldHorizontal label="Required" divider>
        <Switch
          onChange={(value) =>
            updateFieldProps(field.id, 'props.required', value)
          }
          checked={field.props.required}
        />
      </SettingsFieldHorizontal>
      <SettingsFieldOptionsValue label="Custom value" field={field} divider />
      <ContainerSettingsGroup field={field} />
    </div>
  );
}

export default SingleChoiceSettings;
