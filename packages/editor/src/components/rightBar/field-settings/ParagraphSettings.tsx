import type { FormFieldParagraph } from '@efie-form/core';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical.tsx';
import { Controller } from 'react-hook-form';
import Input from '../../form/Input.tsx';
import Select from '../../form/Select.tsx';
import type { FieldKeyPrefix } from '../../../lib/genFieldKey.ts';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal.tsx';
import ColorPicker from '../../form/ColorPicker.tsx';

interface ParagraphSettingsProps {
  field: FormFieldParagraph;
  fieldKey: FieldKeyPrefix;
}

function ParagraphSettings({ fieldKey }: ParagraphSettingsProps) {
  return (
    <div>
      <div>
        <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body2">
          Text
        </div>
        <SettingsFieldVertical label="Font Size" divider>
          <Controller
            key={`${fieldKey}.props.font.size`}
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                onChange={onChange}
                className="w-28"
                suffix="px"
                suffixType="text"
                inputProps={{
                  type: 'number',
                }}
              />
            )}
            name={`${fieldKey}.props.font.size`}
          />
        </SettingsFieldVertical>
        <SettingsFieldVertical label="Text align" divider>
          <Controller
            key={`${fieldKey}.props.textAlign`}
            render={({ field: { value, onChange } }) => (
              <Select
                value={value}
                onChange={onChange}
                className="w-28"
                options={[
                  { label: 'Left', value: 'left' },
                  { label: 'Center', value: 'center' },
                  { label: 'Right', value: 'right' },
                ]}
              />
            )}
            name={`${fieldKey}.props.textAlign`}
          />
        </SettingsFieldVertical>
        <SettingsFieldHorizontal label="Color" divider>
          <Controller
            render={({ field: { value, onChange } }) => (
              <ColorPicker value={value} onChange={onChange} />
            )}
            name={`${fieldKey}.props.color`}
          />
        </SettingsFieldHorizontal>
      </div>
    </div>
  );
}

export default ParagraphSettings;
