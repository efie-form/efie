import type { ElementType } from 'react';
import { cn } from '../../lib/utils';

interface ToolbarButtonProps {
  Icon: ElementType;
  active?: boolean;
  onClick: () => void;
  tooltip: string;
  disabled?: boolean;
}

export default function ToolbarButton({
  Icon,
  active,
  onClick,
  tooltip,
  disabled,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'group relative transform rounded p-1.5 transition-all duration-200 hover:scale-105 hover:bg-neutral-100',
        {
          'bg-primary-100 text-primary-600 shadow-sm': active,
          'text-neutral-600 hover:text-neutral-800': !active && !disabled,
          'cursor-not-allowed text-neutral-300 opacity-50 hover:scale-100': disabled,
        },
      )}
      onClick={onClick}
      disabled={disabled}
      title={tooltip}
    >
      <Icon size={12} className="transition-transform duration-200" />
      <div className="-translate-x-1/2 pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 transform whitespace-nowrap rounded bg-neutral-800 px-2 py-1 text-white text-xs opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {tooltip}
        <div className="-translate-x-1/2 absolute top-full left-1/2 h-0 w-0 transform border-transparent border-t-2 border-t-neutral-800 border-r-2 border-l-2"></div>
      </div>
    </button>
  );
}
