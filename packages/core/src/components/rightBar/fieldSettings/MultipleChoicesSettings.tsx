import type { FormFieldMultipleChoices } from '../../../types/formSchema.ts';

interface MultipleChoicesSettingsProps {
  field: FormFieldMultipleChoices;
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
