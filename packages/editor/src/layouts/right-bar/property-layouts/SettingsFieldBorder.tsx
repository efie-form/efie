import { useSchemaStore } from '../../../lib/state/schema.state.ts';
import SettingsFieldVertical from './SettingsFieldVertical.tsx';
import ColorPicker from '../../../components/form/ColorPicker.tsx';
import SettingsField4Sides from './SettingsField4Sides.tsx';
import SettingsFieldSwitchWithDropdown from './SettingsFieldSwitchWithDropdown.tsx';
import SettingsFieldHorizontal from './SettingsFieldHorizontal.tsx';
import SettingsFieldWidth from './SettingsFieldWidth.tsx';
import type { FormField } from '@efie-form/core';
import Number from '../../../components/form/Number.tsx';

interface SettingsFieldBorderProps {
  label: string;
  field: FormField;
  divider?: boolean;
}

function SettingsFieldBorder({
  label,
  field,
  divider,
}: SettingsFieldBorderProps) {
  const { updateFieldProps } = useSchemaStore();

  if (!('props' in field) || !('container' in field.props)) return null;

  return (
    <>
      <SettingsFieldSwitchWithDropdown
        field={field}
        switchKey="props.border.width"
        label={label}
        divider={divider}
        defaultExpanded={field.props.container.border.width > 0}
      >
        <div className="flex flex-col gap-4">
          <div>
            <p className="typography-body3 text-neutral-800 mb-2">Color</p>
            <ColorPicker
              value={field.props.container.border.color}
              onChange={(newValue) => {
                updateFieldProps(
                  field.id,
                  'props.container.border.color',
                  newValue
                );
              }}
            />
          </div>

          <p className="typography-body3 text-neutral-800 mb-2">Width</p>
          <Number
            value={field.props.container.border.width}
            onChange={(newValue) => {
              updateFieldProps(
                field.id,
                'props.container.border.width',
                newValue
              );
            }}
            suffix="px"
            suffixType="text"
          />

          <SettingsField4Sides
            label="Radius"
            allSideLabel="All Corners"
            splitSides={[
              { key: 'props.border.radius.topLeft', label: 'Top Left' },
              { key: 'props.border.radius.topRight', label: 'Top Right' },
              { key: 'props.border.radius.bottomRight', label: 'Bottom Right' },
              { key: 'props.border.radius.bottomLeft', label: 'Bottom Left' },
            ]}
            field={field}
          />
        </div>
      </SettingsFieldSwitchWithDropdown>
    </>
  );
}

export default SettingsFieldBorder;
