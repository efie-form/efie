import type { ChoiceFormField } from '@efie-form/core';
import ChoiceFieldBase from './ChoiceFieldBase';

interface SingleChoiceProps {
  field: ChoiceFormField;
}

function SingleChoiceField({ field }: SingleChoiceProps) {
  return <ChoiceFieldBase fieldId={field.id} field={field} inputType="radio" />;
}

export default SingleChoiceField;
