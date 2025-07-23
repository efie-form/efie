import { type MultipleChoiceFormField, PropertyType } from '@efie-form/core';
import CategoryHeader from '../../../components/elements/category-header';
import DynamicSettings from '../dynamic-settings';

interface MultipleChoicesSettingsProps {
  field: MultipleChoiceFormField;
}

function MultipleChoicesSettings({ field }: MultipleChoicesSettingsProps) {
  return (
    <div>
      <CategoryHeader>General</CategoryHeader>
      <DynamicSettings
        settings={[
          { template: 'formKey' },
          { template: 'text', label: 'Label', type: PropertyType.LABEL },
          {
            template: 'option',
            label: 'Options',
            type: PropertyType.OPTIONS,
            defaultOptions: ['Option 1', 'Option 2', 'Option 3'],
          },
        ]}
        fieldId={field.id}
      />
    </div>
  );
}

export default MultipleChoicesSettings;
