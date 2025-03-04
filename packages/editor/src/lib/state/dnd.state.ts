import { create } from 'zustand';
import type { FormFieldType } from '@efie-form/core';

interface DndState {
  action?: 'move' | 'new';
  setAction: (action: DndState['action']) => void;
  draggedType?: FormFieldType;
  setDraggedType: (type: FormFieldType) => void;
  direction?: 'up' | 'down';
  setDirection: (direction: DndState['direction']) => void;
  clearDraggingState: () => void;
  originalRect: Record<
    string,
    { x: number; y: number; width: number; height: number }
  >;
  setOriginalRect: (
    key: string,
    rect: { x: number; y: number; width: number; height: number }
  ) => void;
}

export const useDndStore = create<DndState>((set) => ({
  action: undefined,
  setAction: (action) => set({ action }),
  draggedType: undefined,
  setDraggedType: (type) => set({ draggedType: type }),
  direction: undefined,
  setDirection: (direction) => set({ direction }),
  clearDraggingState: () => set({ draggedType: undefined, action: undefined }),
  originalRect: {},
  setOriginalRect: (key, rect) =>
    set((state) => ({ originalRect: { ...state.originalRect, [key]: rect } })),
}));
