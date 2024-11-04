import type { FormFieldDateTime } from '@efie-form/core';
import type { FieldKeyPrefix } from '../../../lib/genFieldKey.ts';
import { FIELDS_NAME } from '../../../lib/constant.ts';
import FieldKeyProperty from '../common/FieldKeyProperty.tsx';
import SettingsFieldVertical from '../../layouts/SettingsFieldVertical.tsx';
import { Controller } from 'react-hook-form';
import Input from '../../form/Input.tsx';
import SettingsFieldHorizontal from '../../layouts/SettingsFieldHorizontal.tsx';
import Switch from '../../form/Switch.tsx';

interface DateTimeSettingsProps {
  field: FormFieldDateTime;
  fieldKey: FieldKeyPrefix;
}

function DateTimeSettings({ field, fieldKey }: DateTimeSettingsProps) {
  return (
    <div>
      <div className="px-4 py-2">
        <p className="typography-body1">{FIELDS_NAME[field.type]}</p>
      </div>
      <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body3 uppercase">
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
      <SettingsFieldHorizontal label="Required" divider>
        <Controller
          key={`${fieldKey}.props.required`}
          render={({ field: { onChange, value } }) => (
            <Switch onChange={onChange} checked={value} />
          )}
          name={`${fieldKey}.props.required`}
        />
      </SettingsFieldHorizontal>
    </div>
  );
}

export default DateTimeSettings;
