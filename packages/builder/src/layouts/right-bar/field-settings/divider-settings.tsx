import { type DividerFormField } from '@efie-form/core';
import DynamicSettings from '../dynamic-settings';
import CategoryHeader from '../../../components/elements/category-header';

interface DividerSettingsProps {
  field: DividerFormField;
}

function DividerSettings({ field }: DividerSettingsProps) {
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

export default DividerSettings;
