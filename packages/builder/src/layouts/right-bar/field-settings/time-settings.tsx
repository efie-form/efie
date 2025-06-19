import { PropertyType, type TimeFormField } from '@efie-form/core';
import DynamicSettings from '../dynamic-settings';

interface TimeSettingsProps {
  field: TimeFormField;
}

function TimeSettings({ field }: TimeSettingsProps) {
  return (
    <div>
      <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body3 uppercase">
        General
      </div>
      <DynamicSettings
        settings={[
          { template: 'formKey' },
          { template: 'text', label: 'Label', type: PropertyType.LABEL },
          { template: 'boolean', label: 'Required', type: PropertyType.REQUIRED },
        ]}
        fieldId={field.id}
      />
    </div>
  );
}

export default TimeSettings;
