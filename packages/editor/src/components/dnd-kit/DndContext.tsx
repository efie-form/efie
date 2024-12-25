import { DndContext as OriginalDndContext } from '@dnd-kit/core';
import type { DndContextTypesafeProps } from './dnd-kit.type';

export default function DndContext(props: DndContextTypesafeProps) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return <OriginalDndContext {...props} />;
}
