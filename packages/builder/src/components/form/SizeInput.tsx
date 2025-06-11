import { SizeUnit } from '@efie-form/core';
import { Select } from './index';
import { useControllableState } from '../../lib/hooks/useControllableState';
import { useState } from 'react';

const SIZE_UNIT_OPTIONS = Object.values(SizeUnit).map(unit => ({ value: String(unit), label: String(unit) }));

interface SizeInputProps {
  value: number;
  unit: string;
  onValueChange: (value: number) => void;
  onUnitChange: (unit: string) => void;
  className?: string;
}

export default function SizeInput({ value, unit, onValueChange, onUnitChange, className }: SizeInputProps) {
  const [internalValue, setInternalValue] = useControllableState({
    onChange: onValueChange,
    value,
  });
  const [isFocused, setIsFocused] = useState(false);

  const getDisplayValue = () => {
    if (internalValue === null || Number.isNaN(internalValue)) {
      return '';
    }
    if (isFocused) {
      return internalValue === 0 ? '' : String(internalValue);
    }
    return internalValue.toLocaleString();
  };

  const handleValueChange = (rawValue: string) => {
    let parsedNumber: number;

    if (rawValue === '') {
      parsedNumber = 0;
    }
    else if (isFocused) {
      parsedNumber = Number.parseFloat(rawValue);
    }
    else {
      const cleanedValue = rawValue.replaceAll(/[^0-9.-]+/g, '');
      parsedNumber = Number.parseFloat(cleanedValue);
    }

    if (!Number.isNaN(parsedNumber)) {
      setInternalValue(parsedNumber);
    }
    else if (rawValue !== '' && Number.isNaN(parsedNumber)) {
      // Invalid input that results in NaN, do not update internal state
    }
  };

  return (
    <div
      className={`relative flex w-32 h-7 items-center border border-neutral-200 rounded-md bg-white overflow-hidden focus-within:outline focus-within:outline-primary focus-within:outline-1 ${className ?? ''}`}
    >
      <div className="flex-1 h-full">
        <input
          value={getDisplayValue()}
          placeholder="0"
          type={isFocused ? 'number' : 'text'}
          className="focus:outline-none w-full h-full typography-body3 text-center px-1 hide-input-arrow"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => {
            const rawValue = e.target.value;
            handleValueChange(rawValue);
          }}
        />
      </div>
      <Select
        value={unit}
        onChange={onUnitChange}
        options={SIZE_UNIT_OPTIONS}
        className="w-12 border-none text-center outline-none focus:ring-0 focus:outline-none bg-transparent px-1"
      />
    </div>
  );
}
