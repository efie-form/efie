import type { SingleChoiceFormField } from '@efie-form/core';
import PropSettingsRequired from '../property-settings/PropSettingsRequired';
import PropSettingsPlaceholder from '../property-settings/PropSettingsPlaceholder';
import PropSettingsLabel from '../property-settings/PropSettingsLabel';
import PropSettingsFormKey from '../property-settings/PropSettingsFormKey';
import PropSettingsOption from '../property-settings/PropSettingsOption';

interface SingleChoiceSettingsProps {
  field: SingleChoiceFormField;
}

function SingleChoiceSettings({ field }: SingleChoiceSettingsProps) {
  return (
    <div>
      <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body3 uppercase">
        General
      </div>
      <PropSettingsFormKey field={field} />
      <PropSettingsLabel field={field} />
      <PropSettingsPlaceholder field={field} />
      <PropSettingsRequired field={field} />
      <PropSettingsOption field={field} />
    </div>
  );
}

export default SingleChoiceSettings;
