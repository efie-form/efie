import type { FormFieldSingleChoice } from '@efie-form/core';
import ChoiceFieldBase from './ChoiceFieldBase';

interface SingleChoiceProps {
  field: FormFieldSingleChoice;
}

function SingleChoiceField({ field }: SingleChoiceProps) {
  return (
    <ChoiceFieldBase
      fieldId={field.id}
      field={field}
      inputType="radio"
      isValueDifferent={field.props.isValueDifferent}
    />
  );
}

export default SingleChoiceField;
