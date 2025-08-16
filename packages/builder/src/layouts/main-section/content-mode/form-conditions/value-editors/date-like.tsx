import type { Operator } from '@efie-form/core';
import { DateRangeInput, Input } from '../../../../../components/form';

export type DateInputType = 'date' | 'time' | 'datetime-local';

interface Props {
  value: unknown;
  onChange: (v: unknown) => void;
  operator?: Operator;
  htmlInputType: DateInputType;
}

const DateLikeValueEditor = ({ value, onChange, operator, htmlInputType }: Props) => {
  if ((operator as string) === 'between') {
    const v = Array.isArray(value) && value.length === 2 ? (value as [string, string]) : undefined;
    return (
      <DateRangeInput
        value={v}
        onChange={(nv) => onChange(nv ?? ['', ''])}
        htmlInputType={htmlInputType}
        placeholder={
          htmlInputType === 'time'
            ? 'Select time range'
            : htmlInputType === 'datetime-local'
              ? 'Select date & time range'
              : 'Select date range'
        }
      />
    );
  }

  return (
    <Input
      value={typeof value === 'string' ? value : ''}
      onChange={onChange}
      inputProps={{ type: htmlInputType }}
      placeholder={
        htmlInputType === 'time'
          ? 'Select time'
          : htmlInputType === 'datetime-local'
            ? 'Select date and time'
            : 'Select date'
      }
    />
  );
};

export default DateLikeValueEditor;
