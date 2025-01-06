import { useSortable } from '@dnd-kit/sortable';
import type { OptionType } from '@efie-form/core';
import { MdOutlineClose, MdOutlineDragIndicator } from 'react-icons/md';

interface ChoiceFieldOptionProps {
  option: OptionType;
  index: number;
  inputType: 'radio' | 'checkbox';
  fieldId: string;
  isValueDifferent?: boolean;
  onUpdate: (value: OptionType) => void;
  onRemove: () => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}

function ChoiceFieldOption({
  option,
  index,
  inputType,
  fieldId,
  isValueDifferent,
  onUpdate,
  onRemove,
  inputRef,
}: ChoiceFieldOptionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: index.toString() });

  const style = {
    transform: transform ? `translateY(${transform.y}px)` : undefined,
    transition: transform ? transition : undefined,
    opacity: isDragging ? 0.5 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 group relative"
    >
      <div
        {...attributes}
        {...listeners}
        className="invisible group-hover:visible absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 cursor-grab"
      >
        <MdOutlineDragIndicator className="text-neutral-500" />
      </div>
      <input type={inputType} name={`${fieldId}-option`} />
      <div className="flex-1">
        <input
          type="text"
          className="typography-body3 focus:outline-none text-neutral-800 w-full"
          value={option.label}
          ref={inputRef}
          onFocus={(e) => {
            e.currentTarget.select();
          }}
          onChange={(e) => {
            const newValue = {
              ...option,
              label: e.target.value,
            };

            if (isValueDifferent && option.value === option.label) {
              newValue.value = e.target.value;
            }

            onUpdate(newValue);
          }}
        />
        <div className="border-t border-neutral-200 invisible group-hover:visible group-focus-within:visible group-focus-within:border-neutral-500" />
      </div>
      <button onClick={onRemove}>
        <MdOutlineClose className="text-neutral-500 cursor-pointer hover:text-neutral-700" />
      </button>
    </div>
  );
}

export default ChoiceFieldOption;
