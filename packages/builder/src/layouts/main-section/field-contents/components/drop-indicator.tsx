import type { Operation } from '@atlaskit/pragmatic-drag-and-drop-hitbox/list-item';
import { cn } from '../../../../lib/utils';

interface DropIndicatorProps {
  operation: Operation;
}

export function DropIndicator({ operation }: DropIndicatorProps) {
  return (
    <div
      className={cn('absolute right-0 left-0 z-[999] h-1 rounded-full bg-primary-400 ', {
        '-translate-y-1/2 top-0': operation === 'reorder-before',
        'bottom-0 translate-y-1/2': operation === 'reorder-after',
      })}
    >
      <div className="-translate-x-1/2 -translate-y-1/2 absolute top-0 left-1/2 rounded-full bg-primary-400 px-3 py-1">
        <p className="typography-body3 text-neutral-50">Drop here</p>
      </div>
    </div>
  );
}
