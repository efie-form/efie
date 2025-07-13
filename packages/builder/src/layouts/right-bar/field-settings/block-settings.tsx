import { type BlockFormField } from '@efie-form/core';
import DynamicSettings from '../dynamic-settings';
import CategoryHeader from '../../../components/elements/category-header';
import { useSettingsStore } from '../../../lib/state/settings.state';
import CustomSettings from '../custom-settings';

interface BlockSettingsProps {
  field: BlockFormField;
}

function BlockSettings({ field }: BlockSettingsProps) {
  const blockSettings = useSettingsStore(state => state.config.block);
  console.log('Block Settings:', blockSettings);

  return (
    <div>
      <CategoryHeader>General</CategoryHeader>
      <DynamicSettings
        settings={[]}
        fieldId={field.id}
      />
      <CustomSettings fieldId={field.id} settings={blockSettings?.settings} />
    </div>
  );
}

export default BlockSettings;
