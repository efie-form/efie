import { create } from 'zustand';
import type { FormFieldType } from '@efie-form/core';

interface DndState {
  action: 'move' | 'new' | null;
  setAction: (action: DndState['action']) => void;
  draggedType: FormFieldType | null;
  setDraggedType: (type: FormFieldType) => void;
  direction: 'up' | 'down' | null;
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
  action: null,
  setAction: (action) => set({ action }),
  draggedType: null,
  setDraggedType: (type) => set({ draggedType: type }),
  direction: null,
  setDirection: (direction) => set({ direction }),
  clearDraggingState: () => set({ draggedType: null, action: null }),
  originalRect: {},
  setOriginalRect: (key, rect) =>
    set((state) => ({ originalRect: { ...state.originalRect, [key]: rect } })),
}));
