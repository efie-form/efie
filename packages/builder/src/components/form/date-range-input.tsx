import * as PopoverPrimitive from '@radix-ui/react-popover';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';

import { HiChevronLeft, HiChevronRight, HiMiniXMark, HiOutlineCalendar } from 'react-icons/hi2';
import { useDateRange } from '../../lib/hooks/use-date-range';
import { cn } from '../../lib/utils';
import Input from './input';

/** Allowed HTML input types we support mirroring from DateLikeValueEditor */
export type DateRangeGranularity = 'date' | 'time' | 'datetime-local';

export interface DateRangeInputProps {
  value?: [string, string] | undefined; // ISO-ish strings depending on granularity
  onChange?: (value?: [string, string]) => void;
  htmlInputType: DateRangeGranularity;
  placeholder?: string;
  disabled?: boolean;
  allowSameDay?: boolean; // default true
  autoSwap?: boolean; // default true
  className?: string;
  locale?: string; // optional dayjs locale key
}

// (All date logic has been moved into useDateRange hook)

const DateRangeInput = ({
  value,
  onChange,
  htmlInputType,
  placeholder = 'Select range',
  disabled,
  allowSameDay = true,
  autoSwap = true,
  className,
  locale,
}: DateRangeInputProps) => {
  // Apply locale if provided
  useEffect(() => {
    if (locale) {
      try {
        dayjs.locale(locale);
      } catch {
        // ignore invalid locale
      }
    }
  }, [locale]);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const {
    displayText,
    calendarView,
    headerLabel,
    goPrev,
    goNext,
    cycleView,
    weekdayLabels,
    leadingBlankCount,
    dayCells,
    monthItems,
    yearItems,
    showTimeInputs,
    startTime,
    endTime,
    updateStartTime,
    updateEndTime,
    clear,
  } = useDateRange({
    value,
    onChange,
    htmlInputType,
    allowSameDay,
    autoSwap,
    locale,
    isOpen: open,
  });

  // TIME ONLY: use two time inputs inside popover for simplicity
  const timeMode = htmlInputType === 'time';
  const hasValue = value?.some((v) => !!v);

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={(o) => !disabled && setOpen(o)}>
      <PopoverPrimitive.Trigger asChild>
        <button
          ref={triggerRef}
          type="button"
          disabled={disabled}
          className={cn(
            'relative flex h-7 w-full items-center justify-between rounded-md border border-neutral-200 bg-white px-2 text-left outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-primary',
            disabled && 'cursor-not-allowed bg-neutral-100 text-neutral-600',
            className,
          )}
        >
          <span
            className={cn('typography-body3 flex-1 truncate', !displayText && 'text-neutral-400')}
          >
            {displayText || placeholder}
          </span>
          {hasValue && (
            <button
              type="button"
              aria-label="Clear"
              onClick={(e) => {
                e.stopPropagation();
                clear();
              }}
              className="ml-1 inline-flex size-5 items-center justify-center rounded text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
              tabIndex={-1}
            >
              <HiMiniXMark className="size-4" />
            </button>
          )}
          <HiOutlineCalendar className="ml-1 size-4 text-neutral-600" />
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side="bottom"
          align="start"
          sideOffset={4}
          onEscapeKeyDown={() => triggerRef.current?.focus()}
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="z-50 w-[280px] rounded-md border border-neutral-200 bg-white p-2 shadow-lg outline-none"
        >
          {timeMode ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Input
                  value={value?.[0]}
                  onChange={(nv) => onChange?.([nv || '', value?.[1] || ''])}
                  inputProps={{ type: 'time' }}
                  placeholder="Start"
                />
                <span className="typography-body3 text-neutral-500">to</span>
                <Input
                  value={value?.[1]}
                  onChange={(nv) => onChange?.([value?.[0] || '', nv || ''])}
                  inputProps={{ type: 'time' }}
                  placeholder="End"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="typography-body4 rounded px-2 py-1 text-neutral-600 hover:bg-neutral-100"
                  onClick={() => clear()}
                >
                  Clear
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  aria-label="Previous month"
                  className="rounded p-1 text-neutral-600 hover:bg-neutral-100"
                  onClick={goPrev}
                >
                  <HiChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  className="typography-body3 font-medium text-neutral-800 hover:text-primary-700"
                  onClick={cycleView}
                >
                  {headerLabel}
                </button>
                <button
                  type="button"
                  aria-label="Next month"
                  className="rounded p-1 text-neutral-600 hover:bg-neutral-100"
                  onClick={goNext}
                >
                  <HiChevronRight className="size-5" />
                </button>
              </div>
              {calendarView === 'day' && (
                <div className="grid grid-cols-7 gap-1">
                  {weekdayLabels.map((d) => (
                    <div key={d} className="typography-body4 text-center text-neutral-500">
                      {d}
                    </div>
                  ))}
                  {Array.from({ length: leadingBlankCount }).map((_, i) => (
                    <div key={`blank-${i}`} />
                  ))}
                  {dayCells.map((c) => (
                    <button
                      key={c.key}
                      type="button"
                      className={cn(
                        'flex h-7 w-7 items-center justify-center rounded text-sm outline-none',
                        'hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-primary-500/50',
                        c.inRange && 'bg-primary-50',
                        c.isEdge && 'bg-primary-600 text-white hover:bg-primary-600',
                      )}
                      onClick={c.onClick}
                      onMouseEnter={c.onHover}
                    >
                      {new Date(c.date).getDate()}
                    </button>
                  ))}
                </div>
              )}
              {showTimeInputs && (
                <div className="flex items-center pt-1 gap-2 justify-center w-full">
                  <div className="flex items-center flex-1">
                    <Input
                      value={startTime}
                      inputProps={{
                        type: 'time',
                      }}
                      onChange={(e) => updateStartTime(e || '00:00')}
                    />
                  </div>
                  <span className="typography-body4 text-neutral-500">-</span>
                  <div className="flex items-center flex-1">
                    <Input
                      value={endTime}
                      inputProps={{
                        type: 'time',
                      }}
                      onChange={(e) => updateEndTime(e || '00:00')}
                    />
                  </div>
                </div>
              )}
              {calendarView === 'month' && (
                <div className="grid grid-cols-3 gap-2">
                  {monthItems.map((m) => (
                    <button
                      key={m.month}
                      type="button"
                      className={cn(
                        'typography-body4 rounded px-2 py-1 text-neutral-700 hover:bg-neutral-100',
                        m.isCurrent && 'bg-primary-600 text-white hover:bg-primary-600',
                      )}
                      onClick={m.onSelect}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              )}
              {calendarView === 'year' && (
                <div className="grid grid-cols-3 gap-2">
                  {yearItems.map((y) => (
                    <button
                      key={y.year}
                      type="button"
                      className={cn(
                        'typography-body4 rounded px-2 py-1 text-neutral-700 hover:bg-neutral-100',
                        y.isCurrent && 'bg-primary-600 text-white hover:bg-primary-600',
                      )}
                      onClick={y.onSelect}
                    >
                      {y.label}
                    </button>
                  ))}
                </div>
              )}
              <div className="mt-1 flex justify-end gap-2">
                <button
                  type="button"
                  className="typography-body4 rounded px-2 py-1 text-neutral-600 hover:bg-neutral-100"
                  onClick={() => clear()}
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};

export default DateRangeInput;
