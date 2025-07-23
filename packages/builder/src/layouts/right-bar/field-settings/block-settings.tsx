import { type BlockFormField, FieldType } from '@efie-form/core';
import CategoryHeader from '../../../components/elements/category-header';
import { useSettingsStore } from '../../../lib/state/settings.state';
import FieldSettings from '../field-settings';

interface BlockSettingsProps {
  field: BlockFormField;
}

function BlockSettings({ field }: BlockSettingsProps) {
  const config = useSettingsStore((state) => state.config[FieldType.BLOCK]);

  return (
    <div>
      <CategoryHeader>General</CategoryHeader>
      <FieldSettings config={config.properties} fieldId={field.id} />
    </div>
  );
}

export default BlockSettings;
