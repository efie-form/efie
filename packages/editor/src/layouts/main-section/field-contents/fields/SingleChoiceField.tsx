import type { FormFieldSingleChoice } from '@efie-form/core';
import type { FieldKeyPrefix } from '../../../../lib/genFieldKey.ts';
import ChoiceFieldBase from './ChoiceFieldBase.tsx';

interface SingleChoiceProps {
  field: FormFieldSingleChoice;
  fieldKey: FieldKeyPrefix;
}

function SingleChoiceField({ field, fieldKey }: SingleChoiceProps) {
  return (
    <ChoiceFieldBase
      fieldId={field.id}
      fieldKey={fieldKey}
      inputType="radio"
      isValueDifferent={field.props.isValueDifferent}
    />
  );
}

export default SingleChoiceField;
