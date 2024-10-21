import type { FormFieldVideo } from '../../../types/formSchema.ts';

interface VideoSettingsProps {
  field: FormFieldVideo;
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
