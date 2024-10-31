import type { FormFieldNumber } from '@efie-form/core';
import { FIELDS_NAME } from '../../../lib/constant.ts';
import SettingsFieldBasic from '../../layouts/SettingsFieldBasic.tsx';
import { Controller } from 'react-hook-form';
import Input from '../../form/Input.tsx';

interface NumberSettingsProps {
  field: FormFieldNumber;
  fieldKey: string;
}

function NumberSettings({ field, fieldKey }: NumberSettingsProps) {
  return (
    <div>
      <div className="px-4 py-2">
        <p className="typography-body1">{FIELDS_NAME[field.type]}</p>
      </div>
      <div>
        <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body2">
          General
        </div>
        <SettingsFieldBasic label="Label" divider>
          <Controller
            key={`${fieldKey}.props.label`}
            render={({ field: { onChange, value } }) => (
              <Input className="w-36" onChange={onChange} value={value} />
            )}
            name={`${fieldKey}.props.label`}
          />
        </SettingsFieldBasic>
        <SettingsFieldBasic label="Placeholder" divider>
          <Controller
            key={`${fieldKey}.props.placeholder`}
            render={({ field: { onChange, value } }) => (
              <Input className="w-36" onChange={onChange} value={value} />
            )}
            name={`${fieldKey}.props.placeholder`}
          />
        </SettingsFieldBasic>
      </div>
    </div>
  );
}

export default NumberSettings;
