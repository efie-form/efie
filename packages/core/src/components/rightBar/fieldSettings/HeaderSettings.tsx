import type { FormFieldHeader } from '../../../types/formSchema.ts';
import { FIELDS_NAME } from '../../../lib/constant.ts';
import Input from '../../form/Input.tsx';
import SettingsFieldBasic from '../../layouts/SettingsFieldBasic.tsx';
import Select from '../../form/Select.tsx';
import { Controller } from 'react-hook-form';

interface HeaderSettingsProps {
  field: FormFieldHeader;
  fieldKey: string;
}

function HeaderSettings({ field, fieldKey }: HeaderSettingsProps) {
  return (
    <div>
      <div className="px-4 py-2">
        <p className="typography-body1">{FIELDS_NAME[field.type]}</p>
      </div>
      <div>
        <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body2">
          Text
        </div>
        <SettingsFieldBasic label="Font Size" divider>
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
        </SettingsFieldBasic>
        <SettingsFieldBasic label="Tag" divider>
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
        </SettingsFieldBasic>
        <SettingsFieldBasic label="Text align" divider>
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
        </SettingsFieldBasic>
        <SettingsFieldBasic label="Color" divider>
          abc
        </SettingsFieldBasic>
      </div>
    </div>
  );
}

export default HeaderSettings;
