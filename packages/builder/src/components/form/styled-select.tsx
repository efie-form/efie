import * as PopoverPrimitive from '@radix-ui/react-popover';
import { type ElementType, useEffect, useMemo, useRef, useState } from 'react';
import { useControllableState } from '../../lib/hooks/use-controllable-state';
import { cn } from '../../lib/utils';
import Tooltip from '../elements/tooltip';

interface StyledSelectProps<T extends string> {
  options: { value: T; label: string; Icon?: ElementType }[];
  value?: T;
  onChange?: (value: T) => void;
  disabled?: boolean;
}

export default function StyledSelect<T extends string>({
  options,
  value,
  onChange,
  disabled,
}: StyledSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [menuWidth, setMenuWidth] = useState<number | undefined>(undefined);

  const [selected, setSelected] = useControllableState<T>({
    value,
    defaultValue: undefined,
    onChange,
  });

  const selectedIndex = useMemo(
    () => options.findIndex((o) => o.value === selected),
    [options, selected],
  );
  const [highlightedIndex, setHighlightedIndex] = useState<number>(
    selectedIndex >= 0 ? selectedIndex : 0,
  );

  // Keep highlighted in sync with selection when options/value change
  useEffect(() => {
    setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }, [selectedIndex]);

  // Measure trigger width to match popover content width
  useEffect(() => {
    if (!open) return;
    const el = triggerRef.current;
    if (!el) return;
    setMenuWidth(el.offsetWidth);

    const ro = new ResizeObserver(() => setMenuWidth(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, [open]);

  // Focus selected option on open
  useEffect(() => {
    if (open) {
      // slight delay to ensure content is in the DOM
      const id = setTimeout(() => {
        optionRefs.current[highlightedIndex]?.focus();
        optionRefs.current[highlightedIndex]?.scrollIntoView({ block: 'nearest' });
      }, 0);
      return () => clearTimeout(id);
    }
  }, [open]);

  const selectedLabel = useMemo(() => {
    const found = options.find((o) => o.value === selected);
    return found?.label ?? 'Select…';
  }, [options, selected]);

  const moveHighlight = (delta: number) => {
    if (!options?.length) return;
    setHighlightedIndex((idx) => {
      const next = (idx + delta + options.length) % options.length;
      // ensure focus & visibility
      const btn = optionRefs.current[next];
      btn?.focus();
      btn?.scrollIntoView({ block: 'nearest' });
      return next;
    });
  };

  // no-op helper removed (handled inline for clarity)

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={(o) => !disabled && setOpen(o)}>
      <PopoverPrimitive.Trigger asChild>
        <button
          ref={triggerRef}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={cn(
            'typography-body3 inline-flex w-full items-center text-left justify-between rounded-md border border-neutral-200 bg-white px-2 py-1 text-neutral-800 outline-none',
            'focus-visible:ring-2 focus-visible:ring-primary-500/50',
            disabled && 'cursor-not-allowed opacity-60',
          )}
          onKeyDown={(e) => {
            if (disabled) return;
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
              e.preventDefault();
              setOpen(true);
              setHighlightedIndex(
                selectedIndex >= 0
                  ? selectedIndex
                  : e.key === 'ArrowDown'
                    ? 0
                    : Math.max(0, options.length - 1),
              );
            } else if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setOpen((v) => !v);
            }
          }}
        >
          <span className="truncate flex-1">{selectedLabel}</span>
          <svg
            className={cn('size-4 shrink-0 transition-transform', open && 'rotate-180')}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden
          >
            <title>Toggle options</title>
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side="bottom"
          align="start"
          sideOffset={4}
          onOpenAutoFocus={(e) => e.preventDefault()}
          onEscapeKeyDown={() => triggerRef.current?.focus()}
        >
          <div
            className={cn(
              'max-h-56 min-w-48 overflow-auto rounded-md border border-neutral-200 bg-white p-1 shadow-lg outline-none',
              'focus-visible:ring-2 focus-visible:ring-primary-500/50',
            )}
            style={{ width: menuWidth }}
          >
            {options?.length ? (
              options.map((opt, idx) => {
                const isSelected = selected === opt.value;
                const isHighlighted = highlightedIndex === idx;
                return (
                  <button
                    id={opt.value}
                    key={opt.value}
                    type="button"
                    ref={(el) => {
                      optionRefs.current[idx] = el;
                    }}
                    data-index={idx}
                    className={cn(
                      'typography-body3 flex w-full items-center gap-2 rounded-sm px-2 py-1 text-left outline-none',
                      isHighlighted && 'bg-neutral-100',
                      isSelected && 'font-medium text-primary-700',
                      'hover:bg-neutral-100 focus:bg-neutral-100',
                    )}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    onClick={() => {
                      setSelected(opt.value);
                      setOpen(false);
                      triggerRef.current?.focus();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        moveHighlight(1);
                      } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        moveHighlight(-1);
                      } else if (e.key === 'Home') {
                        e.preventDefault();
                        setHighlightedIndex(0);
                        optionRefs.current[0]?.focus();
                      } else if (e.key === 'End') {
                        e.preventDefault();
                        const last = Math.max(0, options.length - 1);
                        setHighlightedIndex(last);
                        optionRefs.current[last]?.focus();
                      } else if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelected(opt.value);
                        setOpen(false);
                        triggerRef.current?.focus();
                      } else if (e.key === 'Escape') {
                        e.preventDefault();
                        setOpen(false);
                        triggerRef.current?.focus();
                      }
                    }}
                  >
                    {opt.Icon && (
                      <div>
                        <opt.Icon className="size-4 text-neutral-600" />
                      </div>
                    )}
                    <span className="flex-1 truncate">{opt.label}</span>
                    {isSelected && (
                      <svg
                        className="size-4 text-primary-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden
                      >
                        <title>Selected</title>
                        <path
                          fillRule="evenodd"
                          d="M16.704 5.29a1 1 0 010 1.42l-7.25 7.25a1 1 0 01-1.42 0l-3.25-3.25a1 1 0 111.42-1.42l2.54 2.54 6.54-6.54a1 1 0 011.42 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                );
              })
            ) : (
              <div className="typography-body3 px-2 py-1 text-neutral-500">No options</div>
            )}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
