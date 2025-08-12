import type { Operator } from '@efie-form/core';
import { Input } from '../../../../../components/form';

export type DateInputType = 'date' | 'time' | 'datetime-local';

interface Props {
  value: unknown;
  onChange: (v: unknown) => void;
  operator?: Operator;
  htmlInputType: DateInputType;
}

const DateLikeValueEditor = ({ value, onChange, operator, htmlInputType }: Props) => {
  if ((operator as string) === 'between') {
    const v = Array.isArray(value) ? (value as string[]) : ['', ''];
    return (
      <div className="flex items-center gap-2">
        <Input
          value={v[0]}
          onChange={(nv) => onChange([nv, v[1]])}
          inputProps={{ type: htmlInputType }}
          placeholder="Start"
        />
        <span className="typography-body3 text-neutral-500">to</span>
        <Input
          value={v[1]}
          onChange={(nv) => onChange([v[0], nv])}
          inputProps={{ type: htmlInputType }}
          placeholder="End"
        />
      </div>
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
