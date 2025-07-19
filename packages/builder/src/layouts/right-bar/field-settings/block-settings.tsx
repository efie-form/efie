import { type BlockFormField } from '@efie-form/core';
import DynamicSettings from '../dynamic-settings';
import CategoryHeader from '../../../components/elements/category-header';

interface BlockSettingsProps {
  field: BlockFormField;
}

function BlockSettings({ field }: BlockSettingsProps) {
  console.log('Block Settings:', blockSettings);

  return (
    <div>
      <CategoryHeader>General</CategoryHeader>
      <DynamicSettings
        settings={[]}
        fieldId={field.id}
      />
    </div>
  );
}

export default BlockSettings;
