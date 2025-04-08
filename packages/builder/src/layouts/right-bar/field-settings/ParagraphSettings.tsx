import type { ContentFormField } from '@efie-form/core';
import PropSettingsFontSize from '../property-settings/PropSettingsFontSize';
import PropSettingsTextAlign from '../property-settings/PropSettingsTextAlign';
import PropSettingsColor from '../property-settings/PropSettingsColor';

interface ParagraphSettingsProps {
  field: ContentFormField;
}

function ParagraphSettings({ field }: ParagraphSettingsProps) {
  return (
    <div>
      <div>
        <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body2">
          Text
        </div>
        <PropSettingsFontSize field={field} />
        <PropSettingsTextAlign field={field} />
        <PropSettingsColor field={field} />
      </div>
    </div>
  );
}

export default ParagraphSettings;
