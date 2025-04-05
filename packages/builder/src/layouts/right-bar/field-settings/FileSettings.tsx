import type { FileFormField } from '@efie-form/core';
import PropSettingsRequired from '../property-settings/PropSettingsRequired';
import PropSettingsLabel from '../property-settings/PropSettingsLabel';
import PropSettingsFormKey from '../property-settings/PropSettingsFormKey';
import PropSettingsAccept from '../property-settings/PropSettingsAccept';
import PropSettingsMaxFiles from '../property-settings/PropSettingsMaxFiles';

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
      <PropSettingsRequired field={field} />
      <PropSettingsAccept field={field} />
      <PropSettingsMaxFiles field={field} />
    </div>
  );
}

export default FileSettings;
