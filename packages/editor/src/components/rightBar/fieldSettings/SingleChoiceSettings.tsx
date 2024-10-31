import type { FormFieldSingleChoice } from '@efie-form/core';

interface SingleChoiceSettingsProps {
  field: FormFieldSingleChoice;
  fieldKey: string;
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
