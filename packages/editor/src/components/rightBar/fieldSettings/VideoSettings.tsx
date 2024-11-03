import type { FormFieldVideo } from '@efie-form/core';
import type { FieldKeyPrefix } from '../../../lib/genFieldKey.ts';

interface VideoSettingsProps {
  field: FormFieldVideo;
  fieldKey: FieldKeyPrefix;
}

function VideoSettings({ field }: VideoSettingsProps) {
  return (
    <div>
      {field.id}
      {field.type}
    </div>
  );
}

export default VideoSettings;
