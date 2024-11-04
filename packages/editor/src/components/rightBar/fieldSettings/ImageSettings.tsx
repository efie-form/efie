import type { FormFieldImage } from '@efie-form/core';
import { FIELDS_NAME } from '../../../lib/constant.ts';
import SettingsFieldVertical from '../../layouts/SettingsFieldVertical.tsx';
import { Controller } from 'react-hook-form';
import Input from '../../form/Input.tsx';
import Select from '../../form/Select.tsx';
import SettingsFieldWidth from '../../layouts/SettingsFieldWidth.tsx';
import type { FieldKeyPrefix } from '../../../lib/genFieldKey.ts';

interface ImageSettingsProps {
  field: FormFieldImage;
  fieldKey: FieldKeyPrefix;
}

function ImageSettings({ field, fieldKey }: ImageSettingsProps) {
  return (
    <div>
      <div className="px-4 py-2">
        <p className="typography-body1">{FIELDS_NAME[field.type]}</p>
      </div>
      <div>
        <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body3 uppercase">
          Common
        </div>

        <SettingsFieldVertical label="Image Link" divider>
          <Controller
            key={`${fieldKey}.props.url`}
            render={({ field: { onChange, value } }) => (
              <Input onChange={onChange} value={value} />
            )}
            name={`${fieldKey}.props.url`}
          />
        </SettingsFieldVertical>
        <SettingsFieldVertical label="Alternate Name" divider>
          <Controller
            key={`${fieldKey}.props.alt`}
            render={({ field: { onChange, value } }) => (
              <Input onChange={onChange} value={value} />
            )}
            name={`${fieldKey}.props.alt`}
          />
        </SettingsFieldVertical>
        <SettingsFieldVertical label="Align" divider>
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
        </SettingsFieldVertical>
        <SettingsFieldVertical label="Object Fit" divider>
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
        </SettingsFieldVertical>
        <SettingsFieldWidth fieldKey={fieldKey} label="Width" divider />
      </div>
    </div>
  );
}

export default ImageSettings;
