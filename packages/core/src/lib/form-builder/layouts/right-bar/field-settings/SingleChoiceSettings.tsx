import type { FormFieldSingleChoice } from '@lib/types/formSchema.type.ts';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical';
import Input from '@form-builder/components/form/Input';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';
import Switch from '@form-builder/components/form/Switch';
import SettingsFieldOptionsValue from '../property-layouts/SettingsFieldOptionsValue';
import { useSchemaStore } from '@form-builder/lib/state/schema.state';
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
      <ContainerSettingsGroup field={field} />
    </div>
  );
}

export default SingleChoiceSettings;
