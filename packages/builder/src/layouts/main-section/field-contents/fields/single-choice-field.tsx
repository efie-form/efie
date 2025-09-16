import type { SingleChoiceFormField } from '@efie-form/core';
import ChoiceFieldBase from './choice-field-base';

interface SingleChoiceProps {
  field: SingleChoiceFormField;
}

function SingleChoiceField({ field }: SingleChoiceProps) {
  return <ChoiceFieldBase fieldId={field.sys.id} field={field} inputType="radio" />;
}

export default SingleChoiceField;
