import type { FormFieldNumber } from '@efie-form/core';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical.tsx';
import { Controller } from 'react-hook-form';
import Input from '../../form/Input.tsx';
import type { FieldKeyPrefix } from '../../../lib/genFieldKey.ts';

interface NumberSettingsProps {
  field: FormFieldNumber;
  fieldKey: FieldKeyPrefix;
}

function NumberSettings({ fieldKey }: NumberSettingsProps) {
  return (
    <div>
      <div>
        <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body2">
          General
        </div>
        <SettingsFieldVertical label="Field Key" divider>
          <Controller
            key={`${fieldKey}.id`}
            render={({ field: { onChange, value } }) => (
              <Input onChange={onChange} value={value} />
            )}
            name={`${fieldKey}.id`}
          />
        </SettingsFieldVertical>
        <SettingsFieldVertical label="Label" divider>
          <Controller
            key={`${fieldKey}.props.label`}
            render={({ field: { onChange, value } }) => (
              <Input onChange={onChange} value={value} />
            )}
            name={`${fieldKey}.props.label`}
          />
        </SettingsFieldVertical>
        <SettingsFieldVertical label="Placeholder" divider>
          <Controller
            key={`${fieldKey}.props.placeholder`}
            render={({ field: { onChange, value } }) => (
              <Input onChange={onChange} value={value} />
            )}
            name={`${fieldKey}.props.placeholder`}
          />
        </SettingsFieldVertical>
      </div>
    </div>
  );
}

export default NumberSettings;
