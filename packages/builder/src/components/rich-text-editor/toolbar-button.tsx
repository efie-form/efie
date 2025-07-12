import { type ElementType } from 'react';
import { cn } from '../../lib/utils';

interface ToolbarButtonProps {
  Icon: ElementType;
  active?: boolean;
  onClick: () => void;
  tooltip: string;
  disabled?: boolean;
}

export default function ToolbarButton({ Icon, active, onClick, tooltip, disabled }: ToolbarButtonProps) {
  return (
    <button
      className={cn(
        'p-1.5 hover:bg-neutral-100 transition-all duration-200 rounded relative group transform hover:scale-105',
        {
          'bg-primary-100 text-primary-600 shadow-sm': active,
          'text-neutral-600 hover:text-neutral-800': !active && !disabled,
          'opacity-50 cursor-not-allowed text-neutral-300 hover:scale-100': disabled,
        },
      )}
      onClick={onClick}
      disabled={disabled}
      title={tooltip}
    >
      <Icon size={12} className="transition-transform duration-200" />
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
        {tooltip}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-neutral-800"></div>
      </div>
    </button>
  );
}
