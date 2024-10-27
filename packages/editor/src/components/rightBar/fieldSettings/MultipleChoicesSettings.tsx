import type { FormFieldMultipleChoices } from '../../../types/formSchema.ts';

interface MultipleChoicesSettingsProps {
  field: FormFieldMultipleChoices;
  fieldKey: string;
}

function MultipleChoicesSettings({ field }: MultipleChoicesSettingsProps) {
  return (
    <div>
      {field.id}
      {field.type}
    </div>
  );
}

export default MultipleChoicesSettings;
