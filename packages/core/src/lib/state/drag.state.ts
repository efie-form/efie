import { create } from 'zustand';
import type { FormFieldType } from '../../types/formSchema.ts';

interface DragState {
  dragType: 'new' | 'move' | null;
  draggingNewFieldType: FormFieldType | null;
  setDragType: (dragType: DragState['dragType']) => void;
  setDraggingNewFieldType: (type: DragState['draggingNewFieldType']) => void;
  movingFieldId: string | null;
  setMovingFieldId: (id: DragState['movingFieldId']) => void;
}

export const useDragStore = create<DragState>((set) => ({
  dragType: null,
  draggingNewFieldType: null,
  setDragType: (dragType) => {
    set({ dragType });
  },
  setDraggingNewFieldType: (type) => {
    set({ draggingNewFieldType: type });
  },
  movingFieldId: null,
  setMovingFieldId: (id) => {
    set({ movingFieldId: id });
  },
}));
