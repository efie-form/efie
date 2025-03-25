import type { ChoiceFormField } from '@efie-form/core';
import PropSettingsRequired from '../property-settings/PropSettingsRequired';
import PropSettingsPlaceholder from '../property-settings/PropSettingsPlaceholder';
import PropSettingsLabel from '../property-settings/PropSettingsLabel';
import PropSettingsFormKey from '../property-settings/PropSettingsFormKey';
import SettingsFieldOptionsValue from '../property-layouts/SettingsFieldOptionsValue';

interface MultipleChoicesSettingsProps {
  field: ChoiceFormField;
}

function MultipleChoicesSettings({ field }: MultipleChoicesSettingsProps) {
  return (
    <div>
      <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body3 uppercase">
        General
      </div>
      <PropSettingsFormKey field={field} />
      <PropSettingsLabel field={field} />
      <PropSettingsPlaceholder field={field} />
      <PropSettingsRequired field={field} />
      <SettingsFieldOptionsValue label="Custom value" field={field} divider />
    </div>
  );
}

export default MultipleChoicesSettings;
