import { PropertyType, type LongTextFormField } from '@efie-form/core';
import DynamicSettings from '../dynamic-settings';

interface LongTextSettingsProps {
  field: LongTextFormField;
}

function LongTextSettings({ field }: LongTextSettingsProps) {
  return (
    <div>
      <div>
        <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body2">
          General
        </div>
        <DynamicSettings
          settings={[
            { template: 'formKey' },
            { template: 'text', label: 'Label', type: PropertyType.LABEL },
            { template: 'text', label: 'Placeholder', type: PropertyType.PLACEHOLDER },
            { template: 'boolean', label: 'Required', type: PropertyType.REQUIRED },
          ]}
          fieldId={field.id}
        />
      </div>
    </div>
  );
}

export default LongTextSettings;
