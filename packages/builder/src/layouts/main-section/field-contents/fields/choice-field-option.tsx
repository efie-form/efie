import { useSortable } from '@dnd-kit/sortable';
import type { OptionsProperty } from '@efie-form/core';
import { MdOutlineClose, MdOutlineDragIndicator } from 'react-icons/md';

type OptionType = OptionsProperty['value'][number];

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
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: index.toString(),
  });

  const style = {
    transform: transform ? `translateY(${transform.y}px)` : undefined,
    transition: transform ? transition : undefined,
    opacity: isDragging ? 0.5 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="group relative flex items-center gap-2">
      <div
        {...attributes}
        {...listeners}
        className="-translate-x-full -translate-y-1/2 invisible absolute top-1/2 left-0 cursor-grab group-hover:visible"
      >
        <MdOutlineDragIndicator className="text-neutral-500" />
      </div>
      <input type={inputType} name={`${fieldId}-option`} />
      <div className="flex-1">
        <input
          type="text"
          className="typography-body3 w-full text-neutral-800 focus:outline-none"
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
        <div className="invisible border-neutral-200 border-t group-focus-within:visible group-focus-within:border-neutral-500 group-hover:visible" />
      </div>
      <button type="button" onClick={onRemove} className="invisible group-hover:visible">
        <MdOutlineClose className="cursor-pointer text-neutral-500 hover:text-neutral-700" />
      </button>
    </div>
  );
}

export default ChoiceFieldOption;
