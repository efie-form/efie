import type { FieldKeyPrefix } from '../../../lib/genFieldKey.ts';
import genFieldKey from '../../../lib/genFieldKey.ts';
import type { FormFieldButton } from '@efie-form/core';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical.tsx';
import { Controller } from 'react-hook-form';
import Input from '../../form/Input.tsx';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal.tsx';
import ColorPicker from '../../form/ColorPicker.tsx';
import SettingsField4Sides from '../property-layouts/SettingsField4Sides.tsx';
import Switch from '../../form/Switch.tsx';
import Select from '../../form/Select.tsx';

interface ButtonSettingsProps {
  field: FormFieldButton;
  fieldKey: FieldKeyPrefix;
}

function ButtonSettings({ fieldKey }: ButtonSettingsProps) {
  return (
    <div>
      <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body3 uppercase">
        General
      </div>

      <SettingsFieldVertical label="Label" divider>
        <Controller
          key={`${fieldKey}.props.label`}
          render={({ field: { onChange, value } }) => (
            <Input onChange={onChange} value={value} />
          )}
          name={`${fieldKey}.props.label`}
        />
      </SettingsFieldVertical>
      <SettingsFieldHorizontal label="Background Color" divider>
        <Controller
          key={genFieldKey(fieldKey, 'props.bgColor')}
          render={({ field: { value, onChange } }) => (
            <ColorPicker value={value} onChange={onChange} />
          )}
          name={genFieldKey(fieldKey, 'props.bgColor')}
        />
      </SettingsFieldHorizontal>
      <SettingsFieldHorizontal label="Text Color" divider>
        <Controller
          key={genFieldKey(fieldKey, 'props.color')}
          render={({ field: { value, onChange } }) => (
            <ColorPicker value={value} onChange={onChange} />
          )}
          name={genFieldKey(fieldKey, 'props.color')}
        />
      </SettingsFieldHorizontal>
      <SettingsFieldHorizontal label="Full Width" divider>
        <Controller
          key={genFieldKey(fieldKey, 'props.fullWidth')}
          render={({ field: { value, onChange } }) => (
            <Switch onChange={onChange} checked={value} />
          )}
          name={genFieldKey(fieldKey, 'props.fullWidth')}
        />
      </SettingsFieldHorizontal>
      <SettingsField4Sides
        label="Padding"
        allSideLabel="All Sides"
        fieldKey={fieldKey}
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
        fieldKey={fieldKey}
        splitSides={[
          { key: 'props.border.radius.topLeft', label: 'Top Left' },
          { key: 'props.border.radius.topRight', label: 'Top Right' },
          { key: 'props.border.radius.bottomRight', label: 'Bottom Right' },
          { key: 'props.border.radius.bottomLeft', label: 'Bottom Left' },
        ]}
        divider
      />
      <SettingsFieldVertical label="Position" divider>
        <Controller
          key={`${fieldKey}.props.position`}
          render={({ field: { onChange, value } }) => (
            <Select
              value={value}
              onChange={onChange}
              options={[
                { value: 'left', label: 'Left' },
                { value: 'center', label: 'Center' },
                { value: 'right', label: 'Right' },
              ]}
            />
          )}
          name={`${fieldKey}.props.align`}
        />
      </SettingsFieldVertical>
    </div>
  );
}

export default ButtonSettings;
