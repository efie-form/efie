import type { HeadingFormField } from '@efie-form/core';
import CategoryHeader from '../../../components/elements/category-header';
import DynamicSettings from '../dynamic-settings';

interface HeadingSettingsProps {
  field: HeadingFormField;
}

function HeadingSettings({ field }: HeadingSettingsProps) {
  return (
    <div>
      <CategoryHeader>General</CategoryHeader>
      <DynamicSettings fieldId={field.id} settings={[]} />
    </div>
  );
}

export default HeadingSettings;
