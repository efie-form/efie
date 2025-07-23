import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { cn } from '../../lib/utils';

interface SelectProps<T extends string> {
  value?: T;
  onChange?: (value: T) => void;
  options: { value: T; label: string }[];
  className?: string;
  disabled?: boolean;
}

function Select<T extends string>({
  value,
  disabled,
  options,
  className,
  onChange,
}: SelectProps<T>) {
  const [inputValue, setInputValue] = useControllableState({
    onChange,
    prop: value,
    defaultProp: '' as T,
  });

  return (
    <select
      disabled={disabled}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value as T)}
      className={cn(
        'typography-body3 w-full rounded-md border border-neutral-200 bg-white px-1 py-1 text-neutral-800 outline-none',
        className,
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
