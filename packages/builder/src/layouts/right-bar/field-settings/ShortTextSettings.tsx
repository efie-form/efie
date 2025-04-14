import type { ShortTextFormField } from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state';
import PropSettingsLabel from '../property-settings/PropSettingsLabel';
import PropSettingsPlaceholder from '../property-settings/PropSettingsPlaceholder';
import PropSettingsRequired from '../property-settings/PropSettingsRequired';
import PropSettingsFormKey from '../property-settings/PropSettingsFormKey';
interface ShortTextSettingsProps {
  field: ShortTextFormField;
}

function ShortTextSettings({ field }: ShortTextSettingsProps) {
  const { getFieldKeyById } = useSchemaStore();
  const fieldKey = getFieldKeyById(field.id);
  if (!fieldKey) return <></>;

  return (
    <div>
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
