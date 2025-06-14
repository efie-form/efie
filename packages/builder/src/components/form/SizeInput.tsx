import { type Size } from '@efie-form/core';
import { useControllableState } from '../../lib/hooks/useControllableState';
import { useState } from 'react';
import { cn } from '../../lib/utils';

interface SizeInputProps {
  value?: Size;
  onChange?: (value: Size) => void;
  className?: string;
}

const UNITS = [
  { type: 'auto', label: 'Auto' },
  { type: 'px', label: 'px' },
  { type: 'em', label: 'em' },
  { type: 'rem', label: 'rem' },
  { type: 'vw', label: 'vw' },
  { type: 'vh', label: 'vh' },
  { type: 'percentage', label: '%' },
  { type: 'inherit', label: 'Inherit' },
  { type: 'initial', label: 'Initial' },
] as const;

const requiredValueTypes = new Set([
  'px',
  'em',
  'rem',
  'vw',
  'vh',
  'percentage',
]);

type ValueType = typeof UNITS[number]['type'];

interface InternalValueType {
  value?: string;
  type: ValueType;
}

export default function SizeInput({ value, onChange, className }: SizeInputProps) {
  const [internalValue, setInternalValue] = useControllableState({
    onChange: (newValue: InternalValueType) => {
      if (onChange && checkIsNumberValid(newValue.value)) {
        onChange(transformInternalValueToSize(newValue));
      }
    },
    defaultValue: transformSizeToInternalValue(value),
  });
  const [isValidNumber, setIsValidNumber] = useState(true);

  const handleValueChange = (rawValue: string) => {
    if (!requiredValueTypes.has(internalValue.type)) return; // Don't allow changes when auto is selected

    const isValidNumber = checkIsNumberValid(rawValue);
    setIsValidNumber(isValidNumber || rawValue === '');

    if (isValidNumber) {
      const valueWithoutCommas = rawValue.replaceAll(',', '');
      setInternalValue(prev => ({ ...prev, value: Number(valueWithoutCommas).toLocaleString() }));
    }
    else {
      setInternalValue(prev => ({ ...prev, value: rawValue }));
    }
  };

  const handleUnitChange = (newUnit: ValueType) => {
    switch (newUnit) {
      case 'auto': {
        setInternalValue({ type: 'auto' });
        break;
      }
      case 'percentage':
      case 'px':
      case 'em':
      case 'rem':
      case 'vw':
      case 'vh':
      case 'inherit':
      case 'initial': {
        setInternalValue({ value: internalValue.value, type: newUnit });
        break;
      }
      default: {
        throw new Error(`Unsupported unit type: ${newUnit}`);
      }
    }
  };

  const valueRequired = requiredValueTypes.has(internalValue.type);

  return (
    <div
      className={
        cn(
          `relative flex w-28 h-7 items-center border border-neutral-200 rounded-md bg-white overflow-hidden focus-within:outline focus-within:outline-primary focus-within:outline-1`,
          className,
          {
            'outline !outline-danger-400 bg-danger-50': valueRequired && !isValidNumber,
          },
        )
      }
    >
      {valueRequired && (
        <div className="flex-1 h-full border-e border-e-neutral-200">
          <input
            value={internalValue.value ?? ''}
            placeholder="0"
            className={cn('focus:outline-none w-full h-full typography-body3 text-center px-1 hide-input-arrow',
              {
                'bg-neutral-50 text-neutral-500 cursor-not-allowed': internalValue.type === 'auto',
              },
            )}
            disabled={internalValue.type === 'auto'}
            onChange={(e) => {
              const rawValue = e.target.value;
              handleValueChange(rawValue);
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                e.preventDefault();
                const currentValue = internalValue.value ? Number(internalValue.value.replaceAll(',', '')) : 0;
                const increment = e.shiftKey ? 10 : 1;
                const newValue = e.key === 'ArrowUp' ? currentValue + increment : currentValue - increment;
                handleValueChange(newValue.toString());
              }
            }}
          />
        </div>
      )}
      <select
        className={cn('h-full typography-body3 border-none text-center outline-none focus:ring-0 focus:outline-none bg-transparent px-0.5',
          valueRequired ? 'w-12' : 'w-full',
        )}
        value={internalValue.type}
        onChange={(e) => {
          handleUnitChange(e.target.value as ValueType);
        }}
      >
        {UNITS.map(unit => (
          <option key={unit.type} value={unit.type}>
            {unit.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function transformSizeToInternalValue(size?: Size): InternalValueType {
  if (!size) {
    return { value: '', type: 'px' }; // Default to 0px if no size is provided
  }
  switch (size.type) {
    case 'auto': {
      return { type: 'auto' };
    }
    case 'length': {
      return { value: size.value === 0 ? '' : size.value.toLocaleString(), type: size.unit };
    }
    case 'percentage': {
      return { value: size.value === 0 ? '' : size.value.toLocaleString(), type: 'percentage' };
    }
    case 'initial': {
      return { type: 'initial' };
    }
    case 'inherit': {
      return { type: 'inherit' };
    }
    default: {
      throw new Error(`Unsupported size type: ${JSON.stringify(size)}`);
    }
  }
}

function transformInternalValueToSize(internalValue: InternalValueType): Size {
  if (internalValue.type === 'auto') {
    return { type: 'auto' };
  }
  if (internalValue.type === 'initial') {
    return { type: 'initial' };
  }
  if (internalValue.type === 'inherit') {
    return { type: 'inherit' };
  }
  if (internalValue.type === 'percentage') {
    return { type: 'percentage', value: internalValue.value ? Number(internalValue.value.replaceAll(',', '')) : 0 };
  }
  if (internalValue.value === undefined || internalValue.value === '') {
    return { type: 'length', value: 0, unit: internalValue.type };
  }
  const value = Number(internalValue.value.replaceAll(',', ''));
  return { type: 'length', value, unit: internalValue.type };
}

function checkIsNumberValid(value?: string): boolean {
  if (!value) return false;
  const num = Number(value.replaceAll(',', ''));
  return !Number.isNaN(num);
}
