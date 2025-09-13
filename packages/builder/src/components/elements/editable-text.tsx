import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

interface EditableTextProps {
  defaultValue?: string;
  onSave?: (value: string) => void;
  className?: string;
  inputClassName?: string;
  onDoubleClick?: () => void;
  disabled?: boolean;
  fallback?: string;
}

export default function EditableText({
  defaultValue = '',
  onSave,
  className = '',
  inputClassName = '',
  onDoubleClick,
  disabled = false,
  fallback = 'Untitled',
}: EditableTextProps) {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editMode) {
      inputRef.current?.focus();
    }
  }, [editMode]);

  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);

  const handleSave = () => {
    onSave?.(inputValue || fallback);
    setEditMode(false);
  };

  const handleCancel = () => {
    setInputValue(defaultValue);
    setEditMode(false);
  };

  const handleDoubleClick = () => {
    if (!disabled) {
      setEditMode(true);
      onDoubleClick?.();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  if (editMode) {
    return (
      <input
        ref={inputRef}
        value={inputValue}
        className={cn('typography-body3 px-1 py-0.5 outline-primary', inputClassName)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSave();
          } else if (e.key === 'Escape') {
            handleCancel();
          }
        }}
        onChange={handleChange}
        onBlur={handleSave}
      />
    );
  }

  return (
    <span
      className={className}
      onDoubleClick={handleDoubleClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleDoubleClick();
        }
      }}
    >
      {inputValue}
    </span>
  );
}
