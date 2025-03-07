import type { FormFieldSingleChoice } from '../../../../../../core-old';
import ChoiceFieldBase from './ChoiceFieldBase.tsx';

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
