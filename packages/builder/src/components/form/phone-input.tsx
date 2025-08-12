import { useControllableState } from '@radix-ui/react-use-controllable-state';
import type { ElementType } from 'react';
import { useEffect, useMemo, useState } from 'react';
import {
  countries,
  detectCountryFromPhone,
  getCountryByCode,
  getDialByCode,
} from '../../lib/data/countries';
import { applyGrouping, getPhoneFormatForCountry } from '../../lib/data/phone-formats';
import Input from './input';
import StyledSelect from './styled-select';

interface PhoneInputProps {
  disabled?: boolean;
  placeholder?: string;
  value?: string; // E.164-ish string e.g. "+14155552671" or "14155552671"
  onChange?: (value: string) => void; // emits normalized string with leading '+'
}

function normalizePlus(v: string): string {
  const digits = v.replace(/[^\d+]/g, '');
  return digits.startsWith('+') ? digits : `+${digits.replace(/^\+/, '')}`;
}

function unmask(raw: string): string {
  // Keep only + and digits, ensure leading +
  const cleaned = raw.replace(/[^\d+]/g, '');
  return cleaned.startsWith('+') ? cleaned : `+${cleaned.replace(/^\+/, '')}`;
}
function formatRestForCountry(countryCode: string | undefined, rest: string): string {
  if (!rest) return '';
  const fmt = getPhoneFormatForCountry(countryCode);
  if (fmt) return applyGrouping(rest, fmt.groups);
  // Fallback: group by 3
  const parts: string[] = [];
  for (let i = 0; i < rest.length; i += 3) parts.push(rest.slice(i, i + 3));
  return parts.join(' ');
}

function maskPhone(rawWithPlus: string): string {
  const normalized = normalizePlus(rawWithPlus);
  const digits = normalized.replace(/[^\d]/g, '');
  const det = detectCountryFromPhone(normalized);
  const dial = det?.dialCode || '';
  if (!dial) return `+${digits}`; // Fallback
  const rest = digits.slice(dial.length);
  const restFmt = formatRestForCountry(det?.code, rest);
  return restFmt ? `+${dial} ${restFmt}` : `+${dial}`;
}

export default function PhoneInput({
  disabled: _disabled,
  placeholder = 'Enter phone number',
  value,
  onChange,
}: PhoneInputProps) {
  // Derive selected country from value initially
  const initialCountry = useMemo(() => {
    const det = detectCountryFromPhone(value || '');
    return det?.code || 'US';
  }, [value]);

  const [countryCode, setCountryCode] = useState<string>(initialCountry);

  const dial = getDialByCode(countryCode) || '1';

  // Controlled/uncontrolled phone value (includes leading '+')
  const [phone, setPhone] = useControllableState<string>({
    prop: value ? normalizePlus(value) : undefined,
    onChange: (v) => onChange?.(normalizePlus(v)),
    defaultProp: `+${dial}`,
  });

  // Keep country in sync with current phone
  useEffect(() => {
    const src = value ?? phone ?? '';
    const det = detectCountryFromPhone(src);
    if (det && det.code !== countryCode) {
      setCountryCode(det.code);
    }
  }, [value, phone]);

  // Country dropdown trigger content composes StyledSelect's trigger, so we provide label via options list.
  const countryOptions = useMemo(
    () =>
      countries.map((c) => ({
        value: c.code as string,
        label: `${c.name} (+${c.dialCode})`,
        Icon: (({ className }: { className?: string }) => (
          <span className={className} aria-hidden>
            {c.flag}
          </span>
        )) as unknown as ElementType,
      })),
    [],
  );

  return (
    <div className="flex w-full items-stretch gap-2">
      <div className="w-12">
        <StyledSelect
          options={countryOptions}
          value={countryCode}
          onChange={(code) => {
            const c = getCountryByCode(String(code));
            setCountryCode(c?.code || 'US');
            // When we select the country at the left, clear the right and replace with the selected dial
            const next = `+${c?.dialCode || '1'}`;
            setPhone(next);
          }}
          searchable
          searchPlaceholder="Search country or code…"
          disabled={_disabled}
          triggerVariant="icon-only"
        />
      </div>
      <div className="flex-1">
        <Input
          value={maskPhone(phone || '')}
          onChange={(v) => {
            // User typed full number; auto-detect country and update left
            let withPlus = unmask(v);
            // Enforce max 15 digits for E.164
            const onlyDigits = withPlus.replace(/[^\d]/g, '');
            withPlus = `+${onlyDigits.slice(0, 15)}`;
            const det = detectCountryFromPhone(withPlus);
            if (det && det.code !== countryCode) {
              setCountryCode(det.code);
            }
            setPhone(withPlus);
          }}
          placeholder={placeholder}
          disabled={_disabled}
        />
      </div>
    </div>
  );
}
