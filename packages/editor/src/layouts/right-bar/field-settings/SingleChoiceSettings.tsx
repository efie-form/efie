import type { FormFieldSingleChoice } from '@efie-form/core';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical.tsx';
import Input from '../../../components/form/Input.tsx';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal.tsx';
import Switch from '../../../components/form/Switch.tsx';
import SettingsFieldOptionsValue from '../property-layouts/SettingsFieldOptionsValue.tsx';
import { useSchemaStore } from '../../../lib/state/schema.state.ts';

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
      <SettingsFieldOptionsValue
        label="Option with different value"
        field={field}
        divider
      />
    </div>
  );
}

export default SingleChoiceSettings;
