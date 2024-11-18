import type { FormFieldDivider } from '@efie-form/core';
import { FIELDS_NAME } from '../../../lib/constant.ts';
import SettingsFieldVertical from '../../layouts/SettingsFieldVertical.tsx';
import Input from '../../form/Input.tsx';
import { Controller } from 'react-hook-form';
import Select from '../../form/Select.tsx';
import type { FieldKeyPrefix } from '../../../lib/genFieldKey.ts';
import ColorPicker from '../../form/ColorPicker.tsx';
import SettingsFieldHorizontal from '../../layouts/SettingsFieldHorizontal.tsx';
import Slider from '../../form/Slider.tsx';

interface DividerSettingsProps {
  field: FormFieldDivider;
  fieldKey: FieldKeyPrefix;
}

function DividerSettings({ field, fieldKey }: DividerSettingsProps) {
  return (
    <div>
      <div className="px-4 py-2">
        <p className="typography-body1">{FIELDS_NAME[field.type]}</p>
      </div>
      <div>
        <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body2">
          General
        </div>
        <SettingsFieldVertical label="Width" divider>
          <Controller
            key={`${fieldKey}.props.width`}
            render={({ field: { value, onChange } }) => (
              <div className="flex gap-4">
                <Slider
                  value={value}
                  onChange={onChange}
                  min={0}
                  max={100}
                  step={1}
                />
                <p className="typography-body3 text-neutral-700">{value}%</p>
              </div>
            )}
            name={`${fieldKey}.props.width`}
          />
        </SettingsFieldVertical>

        <SettingsFieldVertical label="Height" divider>
          <Controller
            key={`${fieldKey}.props.height`}
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                onChange={onChange}
                className="w-28"
                suffix="px"
                suffixType="text"
                inputProps={{
                  type: 'number',
                  min: 0,
                }}
              />
            )}
            name={`${fieldKey}.props.height`}
          />
        </SettingsFieldVertical>
        <SettingsFieldVertical label="Style" divider>
          <Controller
            key={`${fieldKey}.props.style`}
            render={({ field: { value, onChange } }) => (
              <Select
                options={[
                  { label: 'Solid', value: 'solid' },
                  { label: 'Dashed', value: 'dashed' },
                  { label: 'Dotted', value: 'dotted' },
                ]}
                onChange={onChange}
                value={value}
              />
            )}
            name={`${fieldKey}.props.style`}
          />
        </SettingsFieldVertical>

        <SettingsFieldHorizontal label="Color" divider>
          <Controller
            key={`${fieldKey}.props.color`}
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

export default DividerSettings;
