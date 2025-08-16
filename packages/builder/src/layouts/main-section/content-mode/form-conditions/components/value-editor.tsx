import { FieldInputType, type FormField, type Operator, PropertyType } from '@efie-form/core';
import { getFieldProp, isInputField } from '../../../../../lib/utils';
import AddressValueEditor from '../value-editors/address';
import BooleanValueEditor from '../value-editors/boolean';
import ChoiceValueEditor from '../value-editors/choice';
import { operatorNeedsNoValue } from '../value-editors/common';
import DateLikeValueEditor from '../value-editors/date-like';
import NumberValueEditor from '../value-editors/number';
import TextLikeValueEditor from '../value-editors/text-like';

interface ValueEditorProps {
  field?: FormField;
  operator?: Operator;
  value: unknown;
  onChange: (v: unknown) => void;
}

const isDateLike = (t?: FieldInputType) =>
  t === FieldInputType.DATE || t === FieldInputType.TIME || t === FieldInputType.DATE_TIME;

const ValueEditor = ({ field, operator, value, onChange }: ValueEditorProps) => {
  if (!field || !isInputField(field)) return null;
  if (operatorNeedsNoValue(operator)) return null;

  const type = field.type as FieldInputType;

  // String-like
  if (
    type === FieldInputType.SHORT_TEXT ||
    type === FieldInputType.LONG_TEXT ||
    type === FieldInputType.EMAIL ||
    type === FieldInputType.PASSWORD ||
    type === FieldInputType.PHONE
  ) {
    return <TextLikeValueEditor value={value} onChange={onChange} operator={operator} />;
  }

  // Number
  if (type === FieldInputType.NUMBER) {
    return <NumberValueEditor value={value} onChange={onChange} />;
  }

  // Date-like
  if (isDateLike(type)) {
    const htmlType =
      type === FieldInputType.TIME
        ? 'time'
        : type === FieldInputType.DATE_TIME
          ? 'datetime-local'
          : 'date';
    return (
      <DateLikeValueEditor
        value={value}
        onChange={onChange}
        operator={operator}
        htmlInputType={htmlType}
      />
    );
  }

  // Checkbox
  if (type === FieldInputType.CHECKBOX) {
    return <BooleanValueEditor value={value} onChange={onChange} />;
  }

  // Choice fields
  if (type === FieldInputType.SINGLE_CHOICE || type === FieldInputType.MULTIPLE_CHOICES) {
    const optsProp = getFieldProp(field, PropertyType.OPTIONS);
    const opts = (optsProp?.value ?? []) as Array<{ value: string; label: string }>;
    const opStr = operator as string | undefined;
    const operatorAllowsList =
      !!opStr &&
      (opStr === 'in' || opStr === 'not_in' || opStr.endsWith('_in') || opStr.endsWith('_not_in'));
    const useMulti = type === FieldInputType.MULTIPLE_CHOICES || operatorAllowsList;
    return (
      <ChoiceValueEditor
        value={value}
        onChange={onChange}
        options={opts.map((o) => ({ value: o.value, label: o.label }))}
        multiple={useMulti}
      />
    );
  }

  if (type === FieldInputType.ADDRESS) {
    return <AddressValueEditor value={value} onChange={onChange} />;
  }

  // Fallback text
  return <TextLikeValueEditor value={value} onChange={onChange} operator={operator} />;
};

export default ValueEditor;
