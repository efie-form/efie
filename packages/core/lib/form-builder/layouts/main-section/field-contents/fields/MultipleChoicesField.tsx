import type { FormFieldMultipleChoices } from '../../../../../types/formSchema.type.ts';
import ChoiceFieldBase from './ChoiceFieldBase';

interface MultipleChoicesProps {
  field: FormFieldMultipleChoices;
}

function MultipleChoicesField({ field }: MultipleChoicesProps) {
  return (
    <ChoiceFieldBase
      fieldId={field.id}
      inputType="checkbox"
      field={field}
      isValueDifferent={field.props.isValueDifferent}
    />
  );
}

export default MultipleChoicesField;
