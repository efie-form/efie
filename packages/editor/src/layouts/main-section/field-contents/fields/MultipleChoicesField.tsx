import type { FormFieldMultipleChoices } from '@efie-form/core';
import ChoiceFieldBase from './ChoiceFieldBase.tsx';

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
