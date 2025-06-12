import type { HeaderFormField } from '@efie-form/core';
import PropSettingsTextAlign from '../property-settings/PropSettingsTextAlign';
import PropSettingsTag from '../property-settings/PropSettingsTag';
import DynamicSettings from '../DynamicSettings';

interface HeaderSettingsProps {
  field: HeaderFormField;
}

function HeaderSettings({ field }: HeaderSettingsProps) {
  return (
    <div>
      <div>
        <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body2">
          Text
        </div>
        <DynamicSettings
          fieldId={field.id}
          settings={[
            { template: 'color', type: 'color', label: 'Text Color' },
            { template: 'size', type: 'fontSize', label: 'Font Size' },
          ]}
        />
        <PropSettingsTag field={field} />
        <PropSettingsTextAlign field={field} />
      </div>
    </div>
  );
}

export default HeaderSettings;
