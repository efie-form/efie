import type { FormFieldShortText } from '@efie-form/core';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical.tsx';
import Input from '../../../components/form/Input.tsx';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal.tsx';
import Switch from '../../../components/form/Switch.tsx';
import { useSchemaStore } from '../../../lib/state/schema.state.ts';
import Number from '../../../components/form/Number.tsx';
import SettingsField4Sides from '../property-layouts/SettingsField4Sides.tsx';
import ColorPicker from '../../../components/form/ColorPicker.tsx';
import SettingsFieldBorder from '../property-layouts/SettingsFieldBorder.tsx';

interface ShortTextSettingsProps {
  field: FormFieldShortText;
}

function ShortTextSettings({ field }: ShortTextSettingsProps) {
  const { getFieldKeyById, updateFieldProps } = useSchemaStore();
  const fieldKey = getFieldKeyById(field.id);
  if (!fieldKey) return null;

  return (
    <div>
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
              updateFieldProps(
                field.id,
                'props.required',
                !field.props.required
              );
            }}
          />
        </SettingsFieldHorizontal>

        <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body3 uppercase">
          Container
        </div>
        <SettingsField4Sides
          label="Margin"
          allSideLabel="All Sides"
          splitSides={[
            { key: 'props.container.margin.top', label: 'Top' },
            { key: 'props.container.margin.right', label: 'Right' },
            { key: 'props.container.margin.bottom', label: 'Bottom' },
            { key: 'props.container.margin.left', label: 'Left' },
          ]}
          field={field}
          divider
        />
        <SettingsField4Sides
          label="Padding"
          allSideLabel="All Sides"
          splitSides={[
            { key: 'props.container.padding.top', label: 'Top' },
            { key: 'props.container.padding.right', label: 'Right' },
            { key: 'props.container.padding.bottom', label: 'Bottom' },
            { key: 'props.container.padding.left', label: 'Left' },
          ]}
          field={field}
          divider
        />
        <SettingsFieldBorder
          label="Border"
          field={field}
          divider
        />
      </div>
    </div>
  );
}

export default ShortTextSettings;
