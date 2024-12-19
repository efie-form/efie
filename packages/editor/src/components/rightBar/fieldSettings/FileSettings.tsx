import type { FormFieldFile } from '@efie-form/core';
import type { FieldKeyPrefix } from '../../../lib/genFieldKey.ts';
import genFieldKey from '../../../lib/genFieldKey.ts';
import FieldKeyProperty from '../common/FieldKeyProperty.tsx';
import SettingsFieldVertical from '../../layouts/SettingsFieldVertical.tsx';
import { Controller } from 'react-hook-form';
import Input from '../../form/Input.tsx';
import SettingsFieldHorizontal from '../../layouts/SettingsFieldHorizontal.tsx';
import Switch from '../../form/Switch.tsx';

interface FileSettingsProps {
  field: FormFieldFile;
  fieldKey: FieldKeyPrefix;
}

function FileSettings({ fieldKey }: FileSettingsProps) {
  return (
    <div>
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
      <SettingsFieldVertical label="Format" divider>
        <Controller
          render={({ field: { value, onChange } }) => (
            <Input
              onChange={onChange}
              value={value}
              placeholder=".jpg,.jpeg,.png"
            />
          )}
          name={genFieldKey(fieldKey, 'props.accept')}
        />
      </SettingsFieldVertical>
      <SettingsFieldHorizontal label="Upload multiple files">
        <Controller
          render={({ field: { value, onChange } }) => (
            <Switch onChange={onChange} checked={value} />
          )}
          name={genFieldKey(fieldKey, 'props.multiple')}
        />
      </SettingsFieldHorizontal>
    </div>
  );
}

export default FileSettings;
