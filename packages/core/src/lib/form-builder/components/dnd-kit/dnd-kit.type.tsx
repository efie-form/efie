import type {
  Active,
  Collision,
  DndContextProps,
  Over,
  Translate,
  UseDraggableArguments,
  UseDroppableArguments,
} from '@dnd-kit/core';
import {
  useDraggable as useOriginalDraggable,
  useDroppable as useOriginalDroppable,
} from '@dnd-kit/core';
import { DndContext as OriginalDndContext } from '@dnd-kit/core';
import type { FormFieldType } from '@lib/InputType';

interface DroppableData {
  id: string;
  type: FormFieldType;
}

interface UseDroppableTypesafeArguments
  extends Omit<UseDroppableArguments, 'data'> {
  data: DroppableData;
}

export function useDroppable(props: UseDroppableTypesafeArguments) {
  return useOriginalDroppable(props);
}

interface DraggableMoveData {
  id: string;
  action: 'move';
  type: FormFieldType;
}

interface DraggableNewData {
  action: 'new';
  type: FormFieldType;
}

type DraggableData = DraggableMoveData | DraggableNewData;

interface UseDraggableTypesafeArguments
  extends Omit<UseDraggableArguments, 'data'> {
  data: DraggableData;
}

export function useDraggable(props: UseDraggableTypesafeArguments) {
  return useOriginalDraggable(props);
}

interface TypesafeActive extends Omit<Active, 'data'> {
  data: React.MutableRefObject<DraggableData | undefined>;
}

interface TypesafeOver extends Omit<Over, 'data'> {
  data: React.MutableRefObject<DroppableData | undefined>;
}

interface DragEvent {
  activatorEvent: Event;
  active: TypesafeActive;
  collisions: Collision[] | null;
  delta: Translate;
  over: TypesafeOver | null;
}

export type DragStartEvent = Pick<DragEvent, 'active'>;

export type DragMoveEvent = DragEvent;

export type DragOverEvent = DragMoveEvent;

export type DragEndEvent = DragEvent;

export type DragCancelEvent = DragEndEvent;

export interface DndContextTypesafeProps
  extends Omit<
    DndContextProps,
    'onDragStart' | 'onDragMove' | 'onDragOver' | 'onDragEnd' | 'onDragCancel'
  > {
  onDragStart?(event: DragStartEvent): void;

  onDragMove?(event: DragMoveEvent): void;

  onDragOver?(event: DragOverEvent): void;

  onDragEnd?(event: DragEndEvent): void;

  onDragCancel?(event: DragCancelEvent): void;
}

export function DndContext(props: DndContextTypesafeProps) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return <OriginalDndContext {...props} />;
}
