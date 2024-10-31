import type { FormFieldDivider } from '@efie-form/core';
import { FIELDS_NAME } from '../../../lib/constant.ts';
import SettingsFieldBasic from '../../layouts/SettingsFieldBasic.tsx';
import Input from '../../form/Input.tsx';
import { Controller } from 'react-hook-form';
import Select from '../../form/Select.tsx';

interface DividerSettingsProps {
  field: FormFieldDivider;
  fieldKey: string;
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
        <SettingsFieldBasic label="Width" divider>
          <Controller
            key={`${fieldKey}.props.width`}
            render={({ field: { value, onChange } }) => (
              <Input
                className="w-24"
                suffix="%"
                suffixType="text"
                onChange={onChange}
                value={value}
                inputProps={{
                  type: 'number',
                  max: 100,
                  min: 0,
                }}
              />
            )}
            name={`${fieldKey}.props.width`}
          />
        </SettingsFieldBasic>

        <SettingsFieldBasic label="Style" divider>
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
        </SettingsFieldBasic>

        <SettingsFieldBasic label="Color" divider>
          <Controller
            key={`${fieldKey}.props.color`}
            render={({ field: { value } }) => <>{value}</>}
            name={`${fieldKey}.props.color`}
          />
        </SettingsFieldBasic>
      </div>
    </div>
  );
}

export default DividerSettings;
