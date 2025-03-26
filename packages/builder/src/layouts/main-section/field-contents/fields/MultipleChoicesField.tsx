import type { ChoiceFormField } from '@efie-form/core';
import ChoiceFieldBase from './ChoiceFieldBase';

interface MultipleChoicesProps {
  field: ChoiceFormField;
}

function MultipleChoicesField({ field }: MultipleChoicesProps) {
  return (
    <ChoiceFieldBase fieldId={field.id} inputType="checkbox" field={field} />
  );
}

export default MultipleChoicesField;
