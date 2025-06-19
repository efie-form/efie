import { PropertyType, type MultipleChoiceFormField } from '@efie-form/core';
import DynamicSettings from '../dynamic-settings';

interface MultipleChoicesSettingsProps {
  field: MultipleChoiceFormField;
}

function MultipleChoicesSettings({ field }: MultipleChoicesSettingsProps) {
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
          { template: 'option', label: 'Options', type: PropertyType.OPTIONS, defaultOptions: ['Option 1', 'Option 2', 'Option 3'] },
        ]}
        fieldId={field.id}
      />
    </div>
  );
}

export default MultipleChoicesSettings;
