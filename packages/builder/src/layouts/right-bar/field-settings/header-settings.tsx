import type { HeadingFormField } from '@efie-form/core';
import CategoryHeader from '../../../components/elements/category-header';
import { useSettingsStore } from '../../../lib/state/settings.state';
import FieldSettings from '../field-settings';

interface HeadingSettingsProps {
  field: HeadingFormField;
}

function HeadingSettings({ field }: HeadingSettingsProps) {
  const config = useSettingsStore((state) => state.config[field.type]);

  return (
    <div>
      <CategoryHeader>General</CategoryHeader>
      <FieldSettings config={config.properties} fieldId={field.id} />
    </div>
  );
}

export default HeadingSettings;
