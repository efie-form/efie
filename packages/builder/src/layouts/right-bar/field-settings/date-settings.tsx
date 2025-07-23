import type { DateFormField } from '@efie-form/core';
import CategoryHeader from '../../../components/elements/category-header';
import { useSettingsStore } from '../../../lib/state/settings.state';
import FieldSettings from '../field-settings';

interface DateSettingsProps {
  field: DateFormField;
}

function DateSettings({ field }: DateSettingsProps) {
  const config = useSettingsStore((state) => state.config[field.type]);

  return (
    <div>
      <CategoryHeader>General</CategoryHeader>

      <FieldSettings config={config.properties} fieldId={field.id} />
    </div>
  );
}

export default DateSettings;
