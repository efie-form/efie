import type { FormFieldVideo } from '@efie-form/core';

interface VideoSettingsProps {
  field: FormFieldVideo;
  fieldKey: string;
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
