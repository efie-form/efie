import type { ButtonFormField } from '@efie-form/core';
import CategoryHeader from '../../../components/elements/category-header';

interface ButtonSettingsProps {
  field: ButtonFormField;
}

function ButtonSettings({ field }: ButtonSettingsProps) {
  const config = useSettingsStore((state) => state.config[field.type]);

  return (
    <div>
      <CategoryHeader>General</CategoryHeader>
      <FieldSettings config={config.properties} fieldId={field.id} />
    </div>
  );
}

export default ButtonSettings;
