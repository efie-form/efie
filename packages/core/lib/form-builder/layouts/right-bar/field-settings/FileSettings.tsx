import type { FormFieldFile } from '../../../../types/formSchema.type.ts';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical';
import Input from '../../../components/form/Input';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';
import Switch from '../../../components/form/Switch';
import { useSchemaStore } from '../../../lib/state/schema.state';
import ContainerSettingsGroup from '../common/ContainerSettingsGroup';
interface FileSettingsProps {
  field: FormFieldFile;
}

function FileSettings({ field }: FileSettingsProps) {
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
      <SettingsFieldVertical label="Format" divider>
        <Input
          onChange={(value) =>
            updateFieldProps(field.id, 'props.accept', value)
          }
          value={field.props.accept}
          placeholder=".jpg,.jpeg,.png"
        />
      </SettingsFieldVertical>
      <SettingsFieldHorizontal label="Upload multiple files">
        <Switch
          onChange={(value) =>
            updateFieldProps(field.id, 'props.multiple', value)
          }
          checked={field.props.multiple}
        />
      </SettingsFieldHorizontal>
      <ContainerSettingsGroup field={field} />
    </div>
  );
}

export default FileSettings;
