import type { FormFieldLongText } from '@efie-form/core';
import { FIELDS_NAME } from '../../../lib/constant.ts';
import SettingsFieldVertical from '../../layouts/SettingsFieldVertical.tsx';
import { Controller } from 'react-hook-form';
import Input from '../../form/Input.tsx';
import FieldKeyProperty from '../common/FieldKeyProperty.tsx';
import type { FieldKeyPrefix } from '../../../lib/genFieldKey.ts';

interface LongTextSettingsProps {
  field: FormFieldLongText;
  fieldKey: FieldKeyPrefix;
}

function LongTextSettings({ field, fieldKey }: LongTextSettingsProps) {
  return (
    <div>
      <div className="px-4 py-2">
        <p className="typography-body1">{FIELDS_NAME[field.type]}</p>
      </div>
      <div>
        <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body2">
          General
        </div>
        <FieldKeyProperty fieldKey={fieldKey} />
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

export default LongTextSettings;
