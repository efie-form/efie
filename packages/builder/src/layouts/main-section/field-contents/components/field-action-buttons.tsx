import type { MouseEvent } from 'react';
import { AiOutlineDrag } from 'react-icons/ai';
import { HiOutlineDocumentDuplicate, HiTrash } from 'react-icons/hi2';

interface FieldActionButtonsProps {
  dragHandlerRef: React.RefObject<HTMLDivElement>;
  onDuplicate: (e: MouseEvent) => void;
  onDelete: () => void;
}

export function FieldActionButtons({
  dragHandlerRef,
  onDuplicate,
  onDelete,
}: FieldActionButtonsProps) {
  return (
    <div className="-translate-x-full absolute top-0 left-0 flex flex-col">
      <div ref={dragHandlerRef} className="cursor-grab bg-primary p-1 text-white">
        <AiOutlineDrag />
      </div>
      <button
        type="button"
        className="bg-success p-1 text-white hover:bg-success-600 transition-colors"
        onClick={onDuplicate}
        title="Duplicate field"
      >
        <HiOutlineDocumentDuplicate />
      </button>
      <button
        type="button"
        className="bg-danger p-1 text-white hover:bg-danger-600 transition-colors"
        onClick={onDelete}
        title="Delete field"
      >
        <HiTrash />
      </button>
    </div>
  );
}
