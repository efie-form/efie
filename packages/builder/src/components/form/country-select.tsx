import type { ElementType } from 'react';
import { countries } from '../../lib/data/countries';
import StyledSelect from './styled-select';

export interface CountrySelectProps {
  disabled?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  value?: string; // country code (ISO2)
  onChange?: (code: string) => void;
}

// Runtime icon wrapper to satisfy StyledSelect's ElementType Icon expectation
function makeFlagIcon(flag: string): ElementType {
  // eslint-disable-next-line react/display-name
  return ((props: { className?: string }) => (
    <span className={props.className} aria-hidden>
      {flag}
    </span>
  )) as unknown as ElementType;
}

export default function CountrySelect({
  disabled,
  searchable = true,
  searchPlaceholder = 'Search country…',
  value,
  onChange,
}: CountrySelectProps) {
  const options = countries.map((c) => ({
    value: c.code as string,
    label: `(+${c.dialCode}) ${c.name}`,
    Icon: makeFlagIcon(c.flag),
  }));

  return (
    <StyledSelect
      options={options}
      value={value as string}
      onChange={(v) => onChange?.(v as string)}
      disabled={disabled}
      searchable={searchable}
      searchPlaceholder={searchPlaceholder}
      filterFn={(opt, q) =>
        opt.label.toLowerCase().includes(q.toLowerCase()) ||
        String(opt.value).toLowerCase().includes(q.toLowerCase())
      }
    />
  );
}
