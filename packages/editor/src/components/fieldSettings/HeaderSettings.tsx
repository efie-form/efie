import type { FormFieldHeader } from '@efie-form/core';
import Input from '../form/Input.tsx';
import SettingsFieldVertical from '../layouts/SettingsFieldVertical.tsx';
import Select from '../form/Select.tsx';
import { Controller } from 'react-hook-form';
import type { FieldKeyPrefix } from '../../lib/genFieldKey.ts';
import SettingsFieldHorizontal from '../layouts/SettingsFieldHorizontal.tsx';
import ColorPicker from '../form/ColorPicker.tsx';

interface HeaderSettingsProps {
  field: FormFieldHeader;
  fieldKey: FieldKeyPrefix;
}

function HeaderSettings({ fieldKey }: HeaderSettingsProps) {
  return (
    <div>
      <div>
        <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body2">
          Text
        </div>
        <SettingsFieldVertical label="Font Size" divider>
          <Controller
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
        <SettingsFieldVertical label="Tag" divider>
          <Controller
            render={({ field: { value, onChange } }) => (
              <Select
                value={value}
                onChange={onChange}
                className="w-28"
                options={[
                  { label: 'H1', value: 'h1' },
                  { label: 'H2', value: 'h2' },
                  { label: 'H3', value: 'h3' },
                  { label: 'H4', value: 'h4' },
                  { label: 'H5', value: 'h5' },
                  { label: 'H6', value: 'h6' },
                ]}
              />
            )}
            name={`${fieldKey}.props.tag`}
          />
        </SettingsFieldVertical>
        <SettingsFieldVertical label="Text align" divider>
          <Controller
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

export default HeaderSettings;
