import { type FileFormField } from '@efie-form/core';
import CategoryHeader from '../../../components/elements/category-header';
import FieldSettings from '../field-settings';
import { useSettingsStore } from '../../../lib/state/settings.state';

interface FileSettingsProps {
  field: FileFormField;
}

function FileSettings({ field }: FileSettingsProps) {
  const config = useSettingsStore(state => state.config[field.type]);

  return (
    <div>
      <CategoryHeader>General</CategoryHeader>
      <FieldSettings config={config.properties} fieldId={field.id} />
    </div>
  );
}

export default FileSettings;
