import type { ElementType } from 'react';
import { cn } from '../../lib/utils.ts';

interface ToolbarButtonProps {
  /**
   * The icon to display in the toolbar button.
   */
  Icon: ElementType;
  /**
   * The label to display on hover popups.
   */
  label?: string;
  /**
   * The function to call when the button is clicked.
   */
  onClick?: () => void;
  disabled?: boolean;
}

function ToolbarButton({ Icon, disabled, onClick }: ToolbarButtonProps) {
  return (
    <button
      className={cn('p-2.5 transition-all', {
        'cursor-pointer hover:bg-neutral-100': !disabled,
        'cursor-default': disabled,
      })}
      onClick={onClick}
    >
      <Icon
        className={cn({
          'text-neutral-800': !disabled,
          'text-neutral-300': disabled,
        })}
      />
    </button>
  );
}

export default ToolbarButton;
