import type { ReactNode } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { cn } from '../../lib/utils';
import type { InputPropsWithoutRef } from 'react-html-props';

export interface InputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  prefix?: ReactNode;
  prefixType?: 'icon' | 'text';
  suffix?: ReactNode;
  suffixType?: 'icon' | 'text';
  disabled?: boolean;
  inputProps?: InputPropsWithoutRef;
}

function Input({
  value,
  onChange,
  placeholder,
  className,
  prefix,
  prefixType,
  suffix,
  suffixType,
  disabled,
  inputProps,
}: InputProps) {
  const [inputValue, setInputValue] = useControllableState({
    prop: value,
    onChange,
    defaultProp: '',
  });

  return (
    <div
      className={cn(
        'relative flex border border-neutral-200 rounded-md bg-white w-full h-7 items-center overflow-hidden focus-within:outline focus-within:outline-primary focus-within:outline-1',
        className,
        {
          'bg-neutral-100': disabled,
        }
      )}
    >
      <RenderPrefixSuffix type={prefixType}>{prefix}</RenderPrefixSuffix>
      <input
        {...inputProps}
        disabled={disabled}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'outline-none w-full flex-1 py-1 placeholder-neutral-400 typography-body3',
          prefix ? 'ps-1' : 'ps-2',
          suffix ? 'pe-1' : 'pe-2',
          disabled ? 'text-neutral-600' : 'text-neutral-800'
        )}
      />
      <RenderPrefixSuffix type={suffixType}>{suffix}</RenderPrefixSuffix>
    </div>
  );
}

interface RenderPrefixSuffixProps {
  type?: 'icon' | 'text';
  children: ReactNode;
}

function RenderPrefixSuffix({ type, children }: RenderPrefixSuffixProps) {
  switch (type) {
    case 'icon': {
      return <div className="px-2">{children}</div>;
    }
    case 'text': {
      return (
        <div className="px-1.5 typography-body4 text-neutral-500">
          {children}
        </div>
      );
    }
    default: {
      return <>{children}</>;
    }
  }
}

export default Input;
