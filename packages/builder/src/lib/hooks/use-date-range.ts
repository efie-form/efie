import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import updateLocale from 'dayjs/plugin/updateLocale';
import weekday from 'dayjs/plugin/weekday';
import { useCallback, useEffect, useMemo, useState } from 'react';

dayjs.extend(localizedFormat);
dayjs.extend(updateLocale);
dayjs.extend(localeData);
dayjs.extend(weekday);

export type DateRangeGranularity = 'date' | 'time' | 'datetime-local';

export interface UseDateRangeOptions {
  value?: [string, string];
  onChange?: (v?: [string, string]) => void;
  htmlInputType: DateRangeGranularity;
  allowSameDay?: boolean;
  autoSwap?: boolean;
  locale?: string;
  isOpen: boolean;
}

interface DayCellMeta {
  date: Date;
  key: string;
  inRange: boolean;
  isEdge: boolean;
  onClick: () => void;
  onHover: () => void;
}

export interface UseDateRangeReturn {
  displayText: string;
  calendarView: 'day' | 'month' | 'year';
  headerLabel: string;
  goPrev: () => void;
  goNext: () => void;
  cycleView: () => void;
  weekdayLabels: string[];
  leadingBlankCount: number;
  dayCells: DayCellMeta[];
  monthItems: { label: string; month: number; isCurrent: boolean; onSelect: () => void }[];
  yearItems: { label: string; year: number; isCurrent: boolean; onSelect: () => void }[];
  showTimeInputs: boolean;
  startTime: string;
  endTime: string;
  setStartTime: (t: string) => void;
  setEndTime: (t: string) => void;
  updateStartTime: (t: string) => void;
  updateEndTime: (t: string) => void;
  clear: () => void;
}

function fromStorage(v: string, g: DateRangeGranularity): Date | undefined {
  if (!v) return undefined;
  if (g === 'time') {
    const [hh, mm] = v.split(':');
    const now = new Date();
    now.setHours(Number(hh) || 0, Number(mm) || 0, 0, 0);
    return now;
  }
  if (g === 'date') {
    const [y, m, d] = v.split('-').map(Number);
    if (!y) return undefined;
    return new Date(y, (m || 1) - 1, d || 1, 0, 0, 0, 0);
  }
  const [datePart, timePart] = v.split('T');
  if (!datePart) return undefined;
  const [y, m, d] = datePart.split('-').map(Number);
  const [hh, mm] = (timePart || '').split(':').map(Number);
  return new Date(y || 0, (m || 1) - 1, d || 1, hh || 0, mm || 0, 0, 0);
}

function toStorage(d: Date, g: DateRangeGranularity) {
  const pad = (n: number) => n.toString().padStart(2, '0');
  if (g === 'time') return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  const datePart = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  if (g === 'date') return datePart;
  return `${datePart}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function sameDay(a?: Date, b?: Date) {
  return (
    !!a &&
    !!b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getMonthDays(base: Date): Date[] {
  const year = base.getFullYear();
  const month = base.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
}

function formatRange(start?: Date, end?: Date, g?: DateRangeGranularity) {
  if (!start || !end) return '';
  const s = dayjs(start);
  const e = dayjs(end);
  if (g === 'time') return `${s.format('HH:mm')} — ${e.format('HH:mm')}`;
  if (g === 'date') return `${s.format('ll')} — ${e.format('ll')}`;
  if (s.isSame(e, 'day')) return `${s.format('ll HH:mm')} — ${e.format('HH:mm')}`;
  return `${s.format('ll HH:mm')} — ${e.format('ll HH:mm')}`;
}

export function useDateRange(options: UseDateRangeOptions): UseDateRangeReturn {
  const {
    value,
    onChange,
    htmlInputType,
    allowSameDay = true,
    autoSwap = true,
    locale,
    isOpen,
  } = options;

  useEffect(() => {
    if (locale) {
      try {
        dayjs.locale(locale);
      } catch {
        /* ignore */
      }
    }
  }, [locale]);

  const startValue = value?.[0];
  const endValue = value?.[1];
  const startDate = startValue ? fromStorage(startValue, htmlInputType) : undefined;
  const endDate = endValue ? fromStorage(endValue, htmlInputType) : undefined;

  const [draftStart, setDraftStart] = useState<Date | undefined>();
  const [draftEnd, setDraftEnd] = useState<Date | undefined>();
  const [previewEnd, setPreviewEnd] = useState<Date | undefined>();
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('00:00');
  const [calendarView, setCalendarView] = useState<'day' | 'month' | 'year'>('day');

  const initialAnchor = startDate || new Date();
  const [monthCursor, setMonthCursor] = useState(
    new Date(initialAnchor.getFullYear(), initialAnchor.getMonth(), 1),
  );

  useEffect(() => {
    if (!isOpen) {
      setDraftStart(undefined);
      setDraftEnd(undefined);
      setPreviewEnd(undefined);
    }
  }, [isOpen]);

  useEffect(() => {
    if (htmlInputType !== 'datetime-local') return;
    if (startValue?.includes('T')) {
      const t = startValue.split('T')[1];
      if (t) setStartTime(t);
    }
    if (endValue?.includes('T')) {
      const t = endValue.split('T')[1];
      if (t) setEndTime(t);
    }
  }, [startValue, endValue, htmlInputType]);

  const days = useMemo(() => getMonthDays(monthCursor), [monthCursor]);

  const apply = useCallback(
    (a?: Date, b?: Date) => {
      if (!a || !b) return;
      const invalid = b < a && !autoSwap;
      const start = b < a && autoSwap ? b : a;
      const end = b < a && autoSwap ? a : b;
      if (invalid) return;
      if (!allowSameDay && sameDay(start, end) && start.getTime() === end.getTime()) return;
      let stored: [string, string];
      if (htmlInputType === 'datetime-local') {
        stored = [
          `${dayjs(start).format('YYYY-MM-DD')}T${startTime}`,
          `${dayjs(end).format('YYYY-MM-DD')}T${endTime}`,
        ];
      } else {
        stored = [toStorage(start, htmlInputType), toStorage(end, htmlInputType)];
      }
      onChange?.(stored);
    },
    [allowSameDay, autoSwap, htmlInputType, onChange, startTime, endTime],
  );

  const headerLabel = useMemo(() => {
    if (calendarView === 'day') return dayjs(monthCursor).format('MMMM YYYY');
    if (calendarView === 'month') return dayjs(monthCursor).format('YYYY');
    const startY = Math.floor(monthCursor.getFullYear() / 12) * 12;
    return `${startY} – ${startY + 11}`;
  }, [calendarView, monthCursor]);

  const goPrev = useCallback(() => {
    setMonthCursor((d) => {
      if (calendarView === 'day') return new Date(d.getFullYear(), d.getMonth() - 1, 1);
      if (calendarView === 'month') return new Date(d.getFullYear() - 1, d.getMonth(), 1);
      return new Date(d.getFullYear() - 12, d.getMonth(), 1);
    });
  }, [calendarView]);

  const goNext = useCallback(() => {
    setMonthCursor((d) => {
      if (calendarView === 'day') return new Date(d.getFullYear(), d.getMonth() + 1, 1);
      if (calendarView === 'month') return new Date(d.getFullYear() + 1, d.getMonth(), 1);
      return new Date(d.getFullYear() + 12, d.getMonth(), 1);
    });
  }, [calendarView]);

  const cycleView = useCallback(() => {
    setCalendarView((v) => (v === 'day' ? 'month' : v === 'month' ? 'year' : 'day'));
  }, []);

  const weekdayLabels = useMemo(() => dayjs.weekdaysMin(), []);
  const leadingBlankCount = useMemo(
    () => new Date(monthCursor.getFullYear(), monthCursor.getMonth(), 1).getDay(),
    [monthCursor],
  );
  const reselecting = !!draftStart && !draftEnd;

  const dayCells: DayCellMeta[] = useMemo(
    () =>
      days.map((d) => {
        let inRange = false;
        if (draftStart && !draftEnd && previewEnd) {
          const a = draftStart < previewEnd ? draftStart : previewEnd;
          const b = draftStart < previewEnd ? previewEnd : draftStart;
          inRange = d >= a && d <= b;
        } else if (draftStart && draftEnd) {
          const a = draftStart < draftEnd ? draftStart : draftEnd;
          const b = draftStart < draftEnd ? draftEnd : draftStart;
          inRange = d >= a && d <= b;
        } else if (!reselecting && startDate && endDate) {
          inRange = d >= startDate && d <= endDate;
        }
        const isStart = !reselecting && startDate && sameDay(d, startDate);
        const isEnd = !reselecting && endDate && sameDay(d, endDate);
        const isDraftStart = draftStart && sameDay(d, draftStart);
        const isDraftEnd = draftEnd && sameDay(d, draftEnd);
        const isPreviewEdge = draftStart && !draftEnd && previewEnd && sameDay(d, previewEnd);
        const isEdge = !!(isStart || isEnd || isDraftStart || isDraftEnd || isPreviewEdge);
        return {
          date: d,
          key: d.toISOString(),
          inRange,
          isEdge,
          onClick: () => {
            if (!draftStart || (draftStart && draftEnd)) {
              setDraftStart(d);
              setDraftEnd(undefined);
              setPreviewEnd(undefined);
              return;
            }
            if (draftStart && !draftEnd) {
              setDraftEnd(d);
              apply(draftStart, d);
            }
          },
          onHover: () => {
            if (draftStart && !draftEnd) setPreviewEnd(d);
          },
        } as DayCellMeta;
      }),
    [days, draftStart, draftEnd, previewEnd, reselecting, startDate, endDate, apply],
  );

  const monthItems = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, m) => ({
        label: dayjs().month(m).format('MMM'),
        month: m,
        isCurrent: monthCursor.getMonth() === m,
        onSelect: () => {
          setMonthCursor((d) => new Date(d.getFullYear(), m, 1));
          setCalendarView('day');
        },
      })),
    [monthCursor],
  );

  const yearItems = useMemo(() => {
    const start = Math.floor(monthCursor.getFullYear() / 12) * 12;
    return Array.from({ length: 12 }).map((_, i) => {
      const y = start + i;
      return {
        label: String(y),
        year: y,
        isCurrent: monthCursor.getFullYear() === y,
        onSelect: () => {
          setMonthCursor((d) => new Date(y, d.getMonth(), 1));
          setCalendarView('month');
        },
      };
    });
  }, [monthCursor]);

  const clear = useCallback(() => onChange?.(undefined), [onChange]);
  const displayText = useMemo(
    () => formatRange(startDate, endDate, htmlInputType),
    [startDate, endDate, htmlInputType],
  );
  // Only show time inputs when in day view (hide during month/year selection)
  const showTimeInputs =
    htmlInputType === 'datetime-local' && calendarView === 'day' && !!startDate && !!endDate;

  const updateStartTime = (t: string) => {
    setStartTime(t);
    if (value) {
      const datePart =
        value[0]?.split('T')[0] ||
        (startDate ? dayjs(startDate).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'));
      onChange?.([`${datePart}T${t}`, value[1]]);
    }
  };
  const updateEndTime = (t: string) => {
    setEndTime(t);
    if (value) {
      const datePart =
        value[1]?.split('T')[0] ||
        (endDate ? dayjs(endDate).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'));
      onChange?.([value[0], `${datePart}T${t}`]);
    }
  };

  return {
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
    setStartTime,
    setEndTime,
    updateStartTime,
    updateEndTime,
    clear,
  };
}

export default useDateRange;
