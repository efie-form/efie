import { type DateTimeFormField } from '@efie-form/core';
import CategoryHeader from '../../../components/elements/category-header';
import FieldSettings from '../field-settings';
import { useSettingsStore } from '../../../lib/state/settings.state';
interface DateTimeSettingsProps {
  field: DateTimeFormField;
}

function DateTimeSettings({ field }: DateTimeSettingsProps) {
  const config = useSettingsStore(state => state.config[field.type]);

  return (
    <div>
      <CategoryHeader>General</CategoryHeader>
      <FieldSettings config={config.properties} fieldId={field.id} />
    </div>
  );
}

export default DateTimeSettings;
