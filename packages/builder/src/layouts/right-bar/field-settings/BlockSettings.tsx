import type { LayoutFormField } from '@efie-form/core';
import SettingsField4Sides from '../property-layouts/SettingsField4Sides';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';
import ColorPicker from '../../../components/form/ColorPicker';
import SettingsFieldShadow from '../property-layouts/SettingsFieldShadow';
import { useSchemaStore } from '../../../lib/state/schema.state';
import PropSettingsBgColor from '../property-settings/PropSettingsBgColor';
import PropSettingsColor from '../property-settings/PropSettingsColor';

interface BlockSettingsProps {
  field: LayoutFormField;
}

function BlockSettings({ field }: BlockSettingsProps) {
  const { getFieldKeyById, getFieldProps, updateFieldProps } = useSchemaStore();
  const fieldKey = getFieldKeyById(field.id);
  if (!fieldKey) return <></>;

  return (
    <div>
      <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body3 uppercase">
        Spacing
      </div>
      <SettingsField4Sides
        label="Padding"
        splitSides={[
          { key: 'props.padding.top', label: 'Top' },
          { key: 'props.padding.right', label: 'Right' },
          { key: 'props.padding.bottom', label: 'Bottom' },
          { key: 'props.padding.left', label: 'Left' },
        ]}
        allSideLabel={'All Sides'}
        field={field}
        divider
      />
      <SettingsField4Sides
        label="Margin"
        allSideLabel="All Sides"
        splitSides={[
          { key: 'props.margin.top', label: 'Top' },
          { key: 'props.margin.right', label: 'Right' },
          { key: 'props.margin.bottom', label: 'Bottom' },
          { key: 'props.margin.left', label: 'Left' },
        ]}
        field={field}
        divider
      />
      <SettingsField4Sides
        label="Border Radius"
        allSideLabel="All sides"
        splitSides={[
          { key: 'props.border.radius.topLeft', label: 'Top Left' },
          { key: 'props.border.radius.topRight', label: 'Top Right' },
          { key: 'props.border.radius.bottomRight', label: 'Bottom Right' },
          { key: 'props.border.radius.bottomLeft', label: 'Bottom Left' },
        ]}
        field={field}
        divider
      />
      <SettingsFieldShadow label="Shadow" field={field} divider />
      <PropSettingsBgColor field={field} />
      <PropSettingsColor field={field} />
    </div>
  );
}

export default BlockSettings;
