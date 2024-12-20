import { create } from 'zustand';
import type { FormFieldType } from '@efie-form/core';

interface DndState {
  draggedType: FormFieldType | null;
  setDraggedType: (type: FormFieldType) => void;
  clearDraggedType: () => void;
  direction: 'up' | 'down' | null;
  setDirection: (direction: DndState['direction']) => void;
}

export const useDndStore = create<DndState>((set) => ({
  draggedType: null,
  setDraggedType: (type) => set({ draggedType: type }),
  clearDraggedType: () => set({ draggedType: null }),
  direction: null,
  setDirection: (direction) => set({ direction }),
}));
