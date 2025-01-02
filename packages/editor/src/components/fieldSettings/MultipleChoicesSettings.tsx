import type { FormFieldMultipleChoices } from '@efie-form/core';
import FieldKeyProperty from '../rightBar/common/FieldKeyProperty.tsx';
import SettingsFieldVertical from '../layouts/SettingsFieldVertical.tsx';
import { Controller } from 'react-hook-form';
import Input from '../form/Input.tsx';
import SettingsFieldHorizontal from '../layouts/SettingsFieldHorizontal.tsx';
import Switch from '../form/Switch.tsx';
import SettingsFieldOptionsValue from '../layouts/SettingsFieldOptionsValue.tsx';
import type { FieldKeyPrefix } from '../../lib/genFieldKey.ts';

interface MultipleChoicesSettingsProps {
  field: FormFieldMultipleChoices;
  fieldKey: FieldKeyPrefix;
}

function MultipleChoicesSettings({ fieldKey }: MultipleChoicesSettingsProps) {
  return (
    <div>
      <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body3 uppercase">
        General
      </div>
      <FieldKeyProperty fieldKey={fieldKey} divider />

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
      <SettingsFieldOptionsValue
        label="Option with different value"
        fieldKey={fieldKey}
        divider
      />
    </div>
  );
}

export default MultipleChoicesSettings;
