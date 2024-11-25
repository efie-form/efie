import { create } from 'zustand';
import type { FormFieldType } from '@efie-form/core';

interface DndState {
  draggedType: FormFieldType | null;
  setDraggedType: (type: FormFieldType) => void;
}

export const useDndStore = create<DndState>((set) => ({
  draggedType: null,
  setDraggedType: (type) => set({ draggedType: type }),
}));
