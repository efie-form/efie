import type { FormFieldBlock } from '@efie-form/core';
import type { FieldKeyPrefix } from '../../../lib/genFieldKey.ts';
import genFieldKey from '../../../lib/genFieldKey.ts';
import SettingsField4Sides from '../../layouts/SettingsField4Sides.tsx';
import SettingsFieldHorizontal from '../../layouts/SettingsFieldHorizontal.tsx';
import ColorPicker from '../../form/ColorPicker.tsx';
import { Controller } from 'react-hook-form';
import SettingsFieldShadow from '../../layouts/SettingsFieldShadow.tsx';

interface BlockSettingsProps {
  field: FormFieldBlock;
  fieldKey: FieldKeyPrefix;
}

function BlockSettings({ fieldKey }: BlockSettingsProps) {
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
        fieldKey={fieldKey}
        allSideLabel={'All Sides'}
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
        fieldKey={fieldKey}
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
        fieldKey={fieldKey}
        divider
      />
      <SettingsFieldShadow label="Shadow" fieldKey={fieldKey} divider />
      <SettingsFieldHorizontal label="Background Color" divider>
        <Controller
          key={`${fieldKey}.props.bgColor`}
          render={({ field: { value, onChange } }) => (
            <ColorPicker value={value} onChange={onChange} />
          )}
          name={genFieldKey(fieldKey, 'props.bgColor')}
        />
      </SettingsFieldHorizontal>
      <SettingsFieldHorizontal label="Text Color" divider>
        <Controller
          key={`${fieldKey}.props.color`}
          render={({ field: { value, onChange } }) => (
            <ColorPicker value={value} onChange={onChange} />
          )}
          name={genFieldKey(fieldKey, 'props.color')}
        />
      </SettingsFieldHorizontal>
    </div>
  );
}

export default BlockSettings;
