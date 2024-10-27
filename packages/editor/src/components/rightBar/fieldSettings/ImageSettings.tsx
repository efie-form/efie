import type { FormFieldImage } from '../../../types/formSchema.ts';
import { FIELDS_NAME } from '../../../lib/constant.ts';
import SettingsFieldBasic from '../../layouts/SettingsFieldBasic.tsx';
import { Controller } from 'react-hook-form';
import Input from '../../form/Input.tsx';
import Select from '../../form/Select.tsx';
import SettingsFieldWidth from '../../layouts/SettingsFieldWidth.tsx';

interface ImageSettingsProps {
  field: FormFieldImage;
  fieldKey: string;
}

function ImageSettings({ field, fieldKey }: ImageSettingsProps) {
  return (
    <div>
      <div className="px-4 py-2">
        <p className="typography-body1">{FIELDS_NAME[field.type]}</p>
      </div>
      <div>
        <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body2">
          Image
        </div>

        <SettingsFieldBasic label="Image Link" divider>
          <Controller
            key={`${fieldKey}.props.url`}
            render={({ field: { onChange, value } }) => (
              <Input className="w-36" onChange={onChange} value={value} />
            )}
            name={`${fieldKey}.props.url`}
          />
        </SettingsFieldBasic>
        <SettingsFieldBasic label="Alternate Name" divider>
          <Controller
            key={`${fieldKey}.props.alt`}
            render={({ field: { onChange, value } }) => (
              <Input className="w-36" onChange={onChange} value={value} />
            )}
            name={`${fieldKey}.props.alt`}
          />
        </SettingsFieldBasic>
        <SettingsFieldBasic label="Align" divider>
          <Controller
            key={`${fieldKey}.props.textAlign`}
            render={({ field: { onChange, value } }) => (
              <Select
                options={[
                  { label: 'Left', value: 'left' },
                  { label: 'Center', value: 'center' },
                  { label: 'Right', value: 'right' },
                ]}
                onChange={onChange}
                value={value}
              />
            )}
            name={`${fieldKey}.props.textAlign`}
          />
        </SettingsFieldBasic>
        <SettingsFieldBasic label="Object Fit" divider>
          <Controller
            key={`${fieldKey}.props.objectFit`}
            render={({ field: { onChange, value } }) => (
              <Select
                options={[
                  { label: 'Fill', value: 'fill' },
                  { label: 'Contain', value: 'contain' },
                  { label: 'Cover', value: 'cover' },
                  { label: 'None', value: 'none' },
                  { label: 'Scale Down', value: 'scale-down' },
                ]}
                onChange={onChange}
                value={value}
              />
            )}
            name={`${fieldKey}.props.objectFit`}
          />
        </SettingsFieldBasic>
        <SettingsFieldWidth fieldKey={fieldKey} label="Width" divider />
      </div>
    </div>
  );
}

export default ImageSettings;
