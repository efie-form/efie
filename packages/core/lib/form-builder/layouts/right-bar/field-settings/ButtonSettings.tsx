import type { FormFieldButton } from '../../../../types/formSchema.type.ts';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical';
import Input from '../../../components/form/Input';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';
import ColorPicker from '../../../components/form/ColorPicker';
import SettingsField4Sides from '../property-layouts/SettingsField4Sides';
import Switch from '../../../components/form/Switch';
import Select from '../../../components/form/Select';
import { useSchemaStore } from '../../../lib/state/schema.state';

interface ButtonSettingsProps {
  field: FormFieldButton;
}

function ButtonSettings({ field }: ButtonSettingsProps) {
  const { updateFieldProps } = useSchemaStore();

  return (
    <div>
      <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body3 uppercase">
        General
      </div>

      <SettingsFieldVertical label="Label" divider>
        <Input
          onChange={(newValue) => {
            updateFieldProps(field.id, 'props.label', newValue);
          }}
          value={field.props.label}
        />
      </SettingsFieldVertical>
      <SettingsFieldHorizontal label="Background Color" divider>
        <ColorPicker
          value={field.props.bgColor}
          onChange={(newValue) => {
            updateFieldProps(field.id, 'props.bgColor', newValue);
          }}
        />
      </SettingsFieldHorizontal>
      <SettingsFieldHorizontal label="Text Color" divider>
        <ColorPicker
          value={field.props.color}
          onChange={(newValue) => {
            updateFieldProps(field.id, 'props.color', newValue);
          }}
        />
      </SettingsFieldHorizontal>
      <SettingsFieldHorizontal label="Full Width" divider>
        <Switch
          checked={field.props.fullWidth}
          onChange={(newValue) => {
            updateFieldProps(field.id, 'props.fullWidth', newValue);
          }}
        />
      </SettingsFieldHorizontal>
      <SettingsField4Sides
        label="Padding"
        allSideLabel="All Sides"
        field={field}
        splitSides={[
          { key: 'props.padding.top', label: 'Top' },
          { key: 'props.padding.right', label: 'Right' },
          { key: 'props.padding.bottom', label: 'Bottom' },
          { key: 'props.padding.left', label: 'Left' },
        ]}
        divider
      />
      <SettingsField4Sides
        label="Border Radius"
        allSideLabel="All Sides"
        field={field}
        splitSides={[
          { key: 'props.border.radius.topLeft', label: 'Top Left' },
          { key: 'props.border.radius.topRight', label: 'Top Right' },
          { key: 'props.border.radius.bottomRight', label: 'Bottom Right' },
          { key: 'props.border.radius.bottomLeft', label: 'Bottom Left' },
        ]}
        divider
      />
      <SettingsFieldVertical label="Position" divider>
        <Select
          value={field.props.align}
          onChange={(newValue) => {
            updateFieldProps(field.id, 'props.align', newValue);
          }}
          options={[
            { value: 'left', label: 'Left' },
            { value: 'center', label: 'Center' },
            { value: 'right', label: 'Right' },
          ]}
        />
      </SettingsFieldVertical>
    </div>
  );
}

export default ButtonSettings;
