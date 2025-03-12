import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { cn } from '../../lib/utils.ts';

interface SelectProps {
  value?: string;
  onChange?: (value: string) => void;
  options?: { value: string; label: string }[];
  className?: string;
  disabled?: boolean;
}

function Select({
  value,
  disabled,
  options,
  className,
  onChange,
}: SelectProps) {
  const [inputValue, setInputValue] = useControllableState({
    onChange,
    prop: value,
    defaultProp: '',
  });

  return (
    <select
      disabled={disabled}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className={cn(
        'w-full border border-neutral-200 text-neutral-800 rounded-md bg-white outline-none typography-body3 py-1 px-1',
        className
      )}
    >
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
