import type { FileFormField } from '@efie-form/core';
import ContainerSettingsGroup from '../common/ContainerSettingsGroup';
import PropSettingsRequired from '../property-settings/PropSettingsRequired';
import PropSettingsPlaceholder from '../property-settings/PropSettingsPlaceholder';
import PropSettingsLabel from '../property-settings/PropSettingsLabel';
import PropSettingsFormKey from '../property-settings/PropSettingsFormKey';
import PropSettingsAccept from '../property-settings/PropSettingsAccept';
import PropSettingsMultiple from '../property-settings/PropSettingsMultiple';
interface FileSettingsProps {
  field: FileFormField;
}

function FileSettings({ field }: FileSettingsProps) {
  return (
    <div>
      <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body3 uppercase">
        General
      </div>
      <PropSettingsFormKey field={field} />
      <PropSettingsLabel field={field} />
      <PropSettingsPlaceholder field={field} />
      <PropSettingsRequired field={field} />
      <PropSettingsAccept field={field} />
      <PropSettingsMultiple field={field} />
      <ContainerSettingsGroup field={field} />
    </div>
  );
}

export default FileSettings;
