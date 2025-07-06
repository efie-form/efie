import { type HeadingFormField } from '@efie-form/core';
import DynamicSettings from '../dynamic-settings';
import CategoryHeader from '../../../components/elements/category-header';

interface HeadingSettingsProps {
  field: HeadingFormField;
}

function HeadingSettings({ field }: HeadingSettingsProps) {
  return (
    <div>
      <CategoryHeader>General</CategoryHeader>
      <DynamicSettings
        fieldId={field.id}
        settings={[]}
      />
    </div>
  );
}

export default HeadingSettings;
