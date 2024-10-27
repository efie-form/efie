import type { FormFieldSingleChoice } from '../../../types/formSchema.ts';

interface SingleChoiceSettingsProps {
  field: FormFieldSingleChoice;
}

function SingleChoiceSettings({ field }: SingleChoiceSettingsProps) {
  return (
    <div>
      {field.id}
      {field.type}
    </div>
  );
}

export default SingleChoiceSettings;
