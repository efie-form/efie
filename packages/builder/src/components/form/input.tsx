import { useControllableState } from '@radix-ui/react-use-controllable-state';
import type { ReactNode, Ref } from 'react';
import type { InputPropsWithoutRef } from 'react-html-props';
import { cn } from '../../lib/utils';

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
  inputRef?: Ref<HTMLInputElement>;
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
  inputRef,
}: InputProps) {
  const [inputValue, setInputValue] = useControllableState({
    prop: value,
    onChange,
    defaultProp: '',
  });

  return (
    <div
      className={cn(
        'relative flex h-7 w-full items-center overflow-hidden rounded-md border border-neutral-200 bg-white focus-within:outline focus-within:outline-1 focus-within:outline-primary',
        className,
        {
          'bg-neutral-100': disabled,
        },
      )}
    >
      <RenderPrefixSuffix type={prefixType}>{prefix}</RenderPrefixSuffix>
      <input
        {...inputProps}
        ref={inputRef}
        disabled={disabled}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'typography-body3 w-full flex-1 py-1 placeholder-neutral-400 outline-none',
          prefix ? 'ps-1' : 'ps-2',
          suffix ? 'pe-1' : 'pe-2',
          disabled ? 'text-neutral-600' : 'text-neutral-800',
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
      return <div className="typography-body4 px-1.5 text-neutral-500">{children}</div>;
    }
    default: {
      return <>{children}</>;
    }
  }
}

export default Input;
