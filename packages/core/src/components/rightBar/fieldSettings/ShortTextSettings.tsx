import type { FormFieldShortText } from '../../../types/formSchema.ts';
import { FIELDS_NAME } from '../../../lib/constant.ts';
import SettingsFieldBasic from '../../layouts/SettingsFieldBasic.tsx';
import Input from '../../form/Input.tsx';
import { Controller } from 'react-hook-form';

interface ShortTextSettingsProps {
  field: FormFieldShortText;
  fieldKey: string;
}

function ShortTextSettings({ field, fieldKey }: ShortTextSettingsProps) {
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

export default ShortTextSettings;
