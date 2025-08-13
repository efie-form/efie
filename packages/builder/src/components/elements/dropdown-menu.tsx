import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as React from 'react';
import { cn } from '../../lib/utils';

// Re-export Root & Trigger for composition
export const DropdownRoot = DropdownMenuPrimitive.Root;
export const DropdownTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownPortal = DropdownMenuPrimitive.Portal;

interface DropdownContentProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> {
  inset?: boolean;
}

export function DropdownContent({ className, sideOffset = 4, ...props }: DropdownContentProps) {
  return (
    <DropdownPortal>
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
        className={cn(
          'z-50 min-w-[8rem] rounded-md border border-neutral-200 bg-white p-1 shadow focus:outline-none',
          className,
        )}
        {...props}
      />
    </DropdownPortal>
  );
}

interface DropdownItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  danger?: boolean;
  asChild?: boolean;
}

export const DropdownItem = React.forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ className, danger, onSelect, onClick, ...props }, ref) => {
    // Prefer onSelect per Radix recommendation; still support onClick for ergonomics.
    const handleSelect = (e: Event) => {
      if (onClick) {
        // convert Event to MouseEvent signature if needed
        // @ts-expect-error Radix passes custom event type; we just forward
        onClick(e);
      }
      if (onSelect) onSelect(e);
    };
    return (
      <DropdownMenuPrimitive.Item
        ref={ref}
        onSelect={handleSelect}
        className={cn(
          'typography-body3 flex w-full cursor-pointer select-none items-center rounded px-3 py-1.5 text-left text-neutral-700 outline-none hover:bg-neutral-50',
          danger && 'text-danger-600 hover:bg-danger-50',
          className,
        )}
        {...props}
      />
    );
  },
);
DropdownItem.displayName = 'DropdownItem';

export const DropdownSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('my-1 h-px bg-neutral-200', className)}
    {...props}
  />
));
DropdownSeparator.displayName = 'DropdownSeparator';

export const DropdownLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn('px-3 py-1.5 text-xs font-medium text-neutral-500', className)}
    {...props}
  />
));
DropdownLabel.displayName = 'DropdownLabel';

// Convenience component for simple menus
interface SimpleMenuProps {
  trigger: React.ReactNode;
  items: Array<{
    key: string;
    label: React.ReactNode;
    onSelect: () => void;
    danger?: boolean;
    disabled?: boolean;
  }>;
  contentClassName?: string;
  align?: 'start' | 'end';
}

export function SimpleMenu({ trigger, items, contentClassName, align }: SimpleMenuProps) {
  return (
    <DropdownRoot>
      <DropdownTrigger asChild>{trigger}</DropdownTrigger>
      <DropdownContent className={contentClassName} align={align}>
        {items.map((it) => (
          <DropdownItem
            key={it.key}
            disabled={it.disabled}
            danger={it.danger}
            onSelect={() => it.onSelect()}
          >
            {it.label}
          </DropdownItem>
        ))}
      </DropdownContent>
    </DropdownRoot>
  );
}
