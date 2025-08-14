import * as PopoverPrimitive from '@radix-ui/react-popover';
import { type ElementType, useEffect, useMemo, useRef, useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { HiChevronDown } from 'react-icons/hi2';
import { useControllableState } from '../../lib/hooks/use-controllable-state';
import { cn } from '../../lib/utils';
import Input from './input';

// Types: single vs multiple selection
interface BaseProps<T extends string> {
  options: { value: T; label: string; Icon?: ElementType }[];
  disabled?: boolean;
  // Search props
  searchable?: boolean;
  searchPlaceholder?: string;
  filterFn?: (option: { value: T; label: string }, query: string) => boolean;
  // Trigger presentation variant
  triggerVariant?: 'default' | 'icon-only' | 'label-only';
  /**
   * Controls the dropdown panel minimum width.
   * - true (default): applies Tailwind class 'min-w-48'.
   * - false: no enforced minimum width (shrinks to trigger width / content).
   * - number: treated as pixel value (e.g. 180 => min-width: 180px).
   * - string:
   *    - If starts with 'min-w-' it's assumed to be a Tailwind utility class and is appended to className.
   *    - Otherwise it's treated as a raw CSS length value (e.g. '12rem', '240px', '50%').
   */
  dropdownMinWidth?: boolean | number | string;
}

interface SingleProps<T extends string> extends BaseProps<T> {
  multiple?: false;
  value?: T;
  onChange?: (value: T) => void;
}

interface MultiProps<T extends string> extends BaseProps<T> {
  multiple: true;
  value?: T[];
  onChange?: (value: T[]) => void;
}

type StyledSelectProps<T extends string> = SingleProps<T> | MultiProps<T>;

export default function StyledSelect<T extends string>(props: StyledSelectProps<T>) {
  const {
    options,
    disabled,
    searchable = false,
    searchPlaceholder = 'Search…',
    filterFn,
    triggerVariant = 'default',
    dropdownMinWidth = true,
  } = props;
  const isMultiple = (props as MultiProps<T>).multiple === true;
  type Selected = T | T[] | undefined;
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [menuWidth, setMenuWidth] = useState<number | undefined>(undefined);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState('');

  const [selected, setSelected] = useControllableState<Selected>({
    value: props.value as Selected,
    defaultValue: (isMultiple ? [] : undefined) as Selected,
    onChange: (v) => {
      if (isMultiple) {
        (props as MultiProps<T>).onChange?.((Array.isArray(v) ? v : []) as T[]);
      } else {
        (props as SingleProps<T>).onChange?.((Array.isArray(v) ? undefined : v) as T);
      }
    },
  });

  // Filtered options based on query
  const filteredOptions = useMemo(() => {
    if (!searchable) return options;
    const q = query.trim().toLowerCase();
    if (!q) return options;
    const defaultFilter = (opt: { value: T; label: string }) =>
      opt.label.toLowerCase().includes(q) || String(opt.value).toLowerCase().includes(q);
    return options.filter((o) => (filterFn ? filterFn(o, query) : defaultFilter(o)));
  }, [options, query, searchable, filterFn]);

  const selectedIndex = useMemo(() => {
    if (Array.isArray(selected)) {
      if (!selected.length) return -1;
      const first = selected[0];
      return options.findIndex((o) => o.value === first);
    }
    return options.findIndex((o) => o.value === selected);
  }, [options, selected]);

  // Index within filtered list for highlight logic
  const selectedIndexFiltered = useMemo(() => {
    if (Array.isArray(selected)) {
      if (!selected.length) return -1;
      const first = selected[0];
      return filteredOptions.findIndex((o) => o.value === first);
    }
    return filteredOptions.findIndex((o) => o.value === selected);
  }, [filteredOptions, selected]);

  const [highlightedIndex, setHighlightedIndex] = useState<number>(
    selectedIndex >= 0 ? selectedIndex : 0,
  );

  // Keep highlighted in sync with selection when options/value/filter change
  useEffect(() => {
    if (filteredOptions.length === 0) {
      setHighlightedIndex(-1);
      return;
    }
    setHighlightedIndex(selectedIndexFiltered >= 0 ? selectedIndexFiltered : 0);
  }, [selectedIndexFiltered, filteredOptions.length]);

  // Reset/prepare when opening
  useEffect(() => {
    if (!open) return;
    // Reset query when opening for a fresh search session
    if (searchable) {
      setQuery('');
    }
    const el = triggerRef.current;
    if (!el) return;
    setMenuWidth(el.offsetWidth);

    const ro = new ResizeObserver(() => setMenuWidth(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, [open, searchable]);

  // Focus input or selected option on open
  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => {
      if (searchable && searchInputRef.current) {
        searchInputRef.current.focus();
        return;
      }
      if (highlightedIndex >= 0) {
        optionRefs.current[highlightedIndex]?.focus();
        optionRefs.current[highlightedIndex]?.scrollIntoView({ block: 'nearest' });
      }
    }, 0);
    return () => clearTimeout(id);
  }, [open, searchable, highlightedIndex]);

  const selectedItem = useMemo(() => {
    if (Array.isArray(selected)) {
      if (!selected.length) return { label: 'Select…', Icon: undefined as ElementType | undefined };
      // Keep order as in options list for consistency
      const byValue = new Map(options.map((o) => [o.value, o.label] as const));
      const orderedSelected = options.map((o) => o.value).filter((v) => selected.includes(v));
      const labels = orderedSelected.map((v) => byValue.get(v) ?? String(v));
      // Show full list; rely on CSS + middle truncation on the trigger to shorten as needed
      const text = labels.join(', ');
      return { label: text, Icon: undefined as ElementType | undefined };
    }
    const found = options.find((o) => o.value === selected);
    return { label: found?.label ?? 'Select…', Icon: found?.Icon };
  }, [options, selected]);

  const moveHighlight = (delta: number) => {
    if (!filteredOptions?.length) return;
    setHighlightedIndex((idx) => {
      const base = idx < 0 ? 0 : idx;
      const next = (base + delta + filteredOptions.length) % Math.max(1, filteredOptions.length);
      const btn = optionRefs.current[next];
      btn?.focus();
      btn?.scrollIntoView({ block: 'nearest' });
      return next;
    });
  };

  const truncateMiddle = (str: string, max = 60) => {
    if (str.length <= max) return str;
    const half = Math.max(1, Math.floor((max - 1) / 2));
    return `${str.slice(0, half)}…${str.slice(-half)}`;
  };

  const triggerText = useMemo(() => truncateMiddle(selectedItem.label, 60), [selectedItem.label]);

  const triggerShowIcon = triggerVariant === 'icon-only' || triggerVariant === 'default';
  const triggerShowLabel = triggerVariant === 'label-only' || triggerVariant === 'default';

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
            'group typography-body3 inline-flex w-full items-center rounded-md border border-neutral-200 bg-white text-neutral-800 outline-none',
            triggerVariant === 'default' && 'gap-2 text-left justify-between px-2 py-1',
            triggerVariant === 'icon-only' && 'justify-between ps-2 pe-1 py-0.5',
            'focus-visible:ring-2 focus-visible:ring-primary-500/50',
            disabled && 'cursor-not-allowed opacity-60',
          )}
          onKeyDown={(e) => {
            if (disabled) return;
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
              e.preventDefault();
              setOpen(true);
              setHighlightedIndex(
                selectedIndexFiltered >= 0
                  ? selectedIndexFiltered
                  : e.key === 'ArrowDown'
                    ? 0
                    : Math.max(0, filteredOptions.length - 1),
              );
            } else if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setOpen((v) => !v);
            }
          }}
        >
          {triggerShowIcon && selectedItem.Icon && !isMultiple && (
            <div>
              <selectedItem.Icon className="size-4 text-neutral-600" />
            </div>
          )}
          {triggerShowLabel && (
            <span className="truncate flex-1" title={selectedItem.label}>
              {triggerText}
            </span>
          )}
          <HiChevronDown className="group-data-[state=open]:-rotate-180 text-neutral-800 transition-transform" />
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
              // boolean true => default class
              dropdownMinWidth === true && 'min-w-48',
              // string starting with min-w- => pass through as class
              typeof dropdownMinWidth === 'string' &&
                dropdownMinWidth.startsWith('min-w-') &&
                dropdownMinWidth,
              'rounded-md border border-neutral-200 bg-white p-1 shadow-lg outline-none',
              'focus-visible:ring-2 focus-visible:ring-primary-500/50',
            )}
            style={{
              width: menuWidth,
              ...(typeof dropdownMinWidth === 'number'
                ? { minWidth: dropdownMinWidth }
                : typeof dropdownMinWidth === 'string' && !dropdownMinWidth.startsWith('min-w-')
                  ? { minWidth: dropdownMinWidth }
                  : {}),
            }}
          >
            {/* Search bar (fixed at top) */}
            {searchable && (
              <div className="sticky top-0 z-10 bg-white p-1">
                <Input
                  value={query}
                  onChange={setQuery}
                  placeholder={searchPlaceholder}
                  prefix={<FaMagnifyingGlass className="size-4 text-neutral-500" />}
                  prefixType="icon"
                  inputRef={searchInputRef}
                  inputProps={{
                    'aria-label': 'Search options',
                    onKeyDown: (e) => {
                      if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        if (filteredOptions.length > 0) {
                          setHighlightedIndex(0);
                          optionRefs.current[0]?.focus();
                        }
                      } else if (e.key === 'Escape') {
                        e.preventDefault();
                        setOpen(false);
                        triggerRef.current?.focus();
                      }
                    },
                  }}
                />
              </div>
            )}

            <div className="max-h-56 overflow-y-auto">
              {/* Options */}
              {filteredOptions?.length ? (
                filteredOptions.map((opt, idx) => {
                  const isSelected = Array.isArray(selected)
                    ? selected.includes(opt.value)
                    : selected === opt.value;
                  const isHighlighted = highlightedIndex === idx;
                  return (
                    <button
                      id={opt.value}
                      key={opt.value}
                      type="button"
                      ref={(el) => {
                        optionRefs.current[idx] = el;
                      }}
                      title={opt.label}
                      data-index={idx}
                      className={cn(
                        'typography-body3 flex w-full items-center gap-1 rounded-sm px-2 py-1 text-left outline-none',
                        isHighlighted && 'bg-neutral-100',
                        isSelected && 'font-medium text-primary-700',
                        'hover:bg-neutral-100 focus:bg-neutral-100',
                      )}
                      onMouseEnter={() => setHighlightedIndex(idx)}
                      onClick={() => {
                        if (Array.isArray(selected)) {
                          const exists = selected.includes(opt.value);
                          const next = exists
                            ? (selected.filter((v) => v !== opt.value) as T[])
                            : ([...selected, opt.value] as T[]);
                          setSelected(next as Selected);
                          // keep menu open for multi-select
                        } else {
                          setSelected(opt.value as Selected);
                          setOpen(false);
                          triggerRef.current?.focus();
                        }
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
                          if (filteredOptions.length > 0) {
                            setHighlightedIndex(0);
                            optionRefs.current[0]?.focus();
                          }
                        } else if (e.key === 'End') {
                          e.preventDefault();
                          const last = Math.max(0, filteredOptions.length - 1);
                          setHighlightedIndex(last);
                          optionRefs.current[last]?.focus();
                        } else if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          if (Array.isArray(selected)) {
                            const exists = selected.includes(opt.value);
                            const next = exists
                              ? (selected.filter((v) => v !== opt.value) as T[])
                              : ([...selected, opt.value] as T[]);
                            setSelected(next as Selected);
                            // keep open in multi
                          } else {
                            setSelected(opt.value as Selected);
                            setOpen(false);
                            triggerRef.current?.focus();
                          }
                        } else if (e.key === 'Escape') {
                          e.preventDefault();
                          setOpen(false);
                          triggerRef.current?.focus();
                        } else if (e.key === 'Tab') {
                          // Allow tabbing out closes the menu
                          setOpen(false);
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
              ) : options?.length ? (
                <div className="typography-body3 px-2 py-1 text-neutral-500">No matches</div>
              ) : (
                <div className="typography-body3 px-2 py-1 text-neutral-500">No options</div>
              )}
            </div>
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
