import type { MultipleChoiceFormField } from '@efie-form/core';
import ChoiceFieldBase from './choice-field-base';

interface MultipleChoicesProps {
  field: MultipleChoiceFormField;
}

function MultipleChoicesField({ field }: MultipleChoicesProps) {
  return <ChoiceFieldBase fieldId={field.sys.id} inputType="checkbox" field={field} />;
}

export default MultipleChoicesField;
