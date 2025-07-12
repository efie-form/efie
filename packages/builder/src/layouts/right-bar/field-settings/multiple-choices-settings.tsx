import { PropertyType, PropSettingsTemplate, type MultipleChoiceFormField } from '@efie-form/core';
import DynamicSettings from '../dynamic-settings';
import CategoryHeader from '../../../components/elements/category-header';

interface MultipleChoicesSettingsProps {
  field: MultipleChoiceFormField;
}

function MultipleChoicesSettings({ field }: MultipleChoicesSettingsProps) {
  return (
    <div>
      <CategoryHeader>General</CategoryHeader>
      <DynamicSettings
        settings={[
          { template: PropSettingsTemplate.FORM_KEY },
          { template: PropSettingsTemplate.TEXT, label: 'Label', type: PropertyType.LABEL },
          { template: PropSettingsTemplate.OPTION, label: 'Options', type: PropertyType.OPTIONS, defaultOptions: ['Option 1', 'Option 2', 'Option 3'] },
        ]}
        fieldId={field.id}
      />
    </div>
  );
}

export default MultipleChoicesSettings;
