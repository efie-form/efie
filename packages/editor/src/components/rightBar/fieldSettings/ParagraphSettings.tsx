import type { FormFieldParagraph } from '@efie-form/core';
import { FIELDS_NAME } from '../../../lib/constant.ts';
import SettingsFieldBasic from '../../layouts/SettingsFieldBasic.tsx';
import { Controller } from 'react-hook-form';
import Input from '../../form/Input.tsx';
import Select from '../../form/Select.tsx';

interface ParagraphSettingsProps {
  field: FormFieldParagraph;
  fieldKey: string;
}

function ParagraphSettings({ field, fieldKey }: ParagraphSettingsProps) {
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
            key={`${fieldKey}.props.font.size`}
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
        <SettingsFieldBasic label="Text align" divider>
          <Controller
            key={`${fieldKey}.props.textAlign`}
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
      </div>
    </div>
  );
}

export default ParagraphSettings;
