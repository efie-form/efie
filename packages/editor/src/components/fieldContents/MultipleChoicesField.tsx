import type { FormFieldMultipleChoices } from '@efie-form/core';
import type { FieldKeyPrefix } from '../../lib/genFieldKey.ts';
import ChoiceFieldBase from './ChoiceFieldBase';

interface MultipleChoicesProps {
  field: FormFieldMultipleChoices;
  fieldKey: FieldKeyPrefix;
}

function MultipleChoicesField({ field, fieldKey }: MultipleChoicesProps) {
  return (
    <ChoiceFieldBase
      fieldId={field.id}
      fieldKey={fieldKey}
      inputType="checkbox"
      isValueDifferent={field.props.isValueDifferent}
    />
  );
}

export default MultipleChoicesField;
