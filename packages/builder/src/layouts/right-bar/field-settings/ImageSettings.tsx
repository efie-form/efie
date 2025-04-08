import type { ImageFormField } from '@efie-form/core';
import PropSettingsTextAlign from '../property-settings/PropSettingsTextAlign';
import PropSettingsObjectFit from '../property-settings/PropSettingsObjectFit';
import PropSettingsWidth from '../property-settings/PropSettingsWidth';
import PropSettingsSrc from '../property-settings/PropSettingsSrc';
import PropSettingsAlt from '../property-settings/PropSettingsAlt';
interface ImageSettingsProps {
  field: ImageFormField;
}

function ImageSettings({ field }: ImageSettingsProps) {
  return (
    <div>
      <div>
        <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body3 uppercase">
          Common
        </div>
        <PropSettingsSrc field={field} />
        <PropSettingsAlt field={field} />
        <PropSettingsTextAlign field={field} />
        <PropSettingsObjectFit field={field} />
        <PropSettingsWidth field={field} />
      </div>
    </div>
  );
}

export default ImageSettings;
