import { PropertyType, type ShortTextFormField } from '@efie-form/core';
import PropSettingsLabel from '../property-settings/PropSettingsLabel';
import PropSettingsPlaceholder from '../property-settings/PropSettingsPlaceholder';
import PropSettingsRequired from '../property-settings/PropSettingsRequired';
import PropSettingsFormKey from '../property-settings/PropSettingsFormKey';
import DynamicSettings from '../DynamicSettings';

interface ShortTextSettingsProps {
  field: ShortTextFormField;
}

function ShortTextSettings({ field }: ShortTextSettingsProps) {
  return (
    <div>
      <DynamicSettings
        settings={[
          { template: 'text', label: 'Label', type: PropertyType.LABEL },
          { template: 'text', label: 'Placeholder', type: PropertyType.PLACEHOLDER },
          { template: 'boolean', label: 'Required', type: PropertyType.REQUIRED },
        ]}
        fieldId={field.id}
      />
      <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body3 uppercase">
        General
      </div>
      <PropSettingsFormKey field={field} />
      <PropSettingsLabel field={field} />
      <PropSettingsPlaceholder field={field} />
      <PropSettingsRequired field={field} />
    </div>
  );
}

export default ShortTextSettings;
