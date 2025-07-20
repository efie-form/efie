import { FieldType, type ShortTextFormField } from '@efie-form/core';
import CategoryHeader from '../../../components/elements/category-header';
import FieldSettings from '../field-settings';
import { useSettingsStore } from '../../../lib/state/settings.state';

interface ShortTextSettingsProps {
  field: ShortTextFormField;
}

function ShortTextSettings({ field }: ShortTextSettingsProps) {
  const config = useSettingsStore(state => state.config[FieldType.SHORT_TEXT]);

  return (
    <div>
      <CategoryHeader>General</CategoryHeader>
      {/* <DynamicSettings
        settings={[
          { template: PropSettingsTemplate.FORM_KEY },
          { template: PropSettingsTemplate.TEXT, label: 'Label', type: PropertyType.LABEL },
          { template: PropSettingsTemplate.TEXT, label: 'Placeholder', type: PropertyType.PLACEHOLDER },
        ]}
        fieldId={field.id}
      /> */}
      <FieldSettings config={config.properties} fieldId={field.id} />
    </div>
  );
}

export default ShortTextSettings;
