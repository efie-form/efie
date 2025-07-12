import { PropertyType, PropSettingsTemplate, type TimeFormField } from '@efie-form/core';
import DynamicSettings from '../dynamic-settings';
import CategoryHeader from '../../../components/elements/category-header';

interface TimeSettingsProps {
  field: TimeFormField;
}

function TimeSettings({ field }: TimeSettingsProps) {
  return (
    <div>
      <CategoryHeader>General</CategoryHeader>
      <DynamicSettings
        settings={[
          { template: PropSettingsTemplate.FORM_KEY },
          { template: PropSettingsTemplate.TEXT, label: 'Label', type: PropertyType.LABEL },
        ]}
        fieldId={field.id}
      />
    </div>
  );
}

export default TimeSettings;
