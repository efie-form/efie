import { type HeaderFormField } from '@efie-form/core';
import DynamicSettings from '../dynamic-settings';
import CategoryHeader from '../../../components/elements/category-header';

interface HeaderSettingsProps {
  field: HeaderFormField;
}

function HeaderSettings({ field }: HeaderSettingsProps) {
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

export default HeaderSettings;
