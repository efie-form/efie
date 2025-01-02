import type { FormSchema, OptionType } from '@efie-form/core';
import { useFieldArray, useFormContext } from 'react-hook-form';
import type { FieldKeyPrefix } from '../../lib/genFieldKey.ts';
import genFieldKey from '../../lib/genFieldKey.ts';
import { useRef } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { DragEndEvent } from '@dnd-kit/core';
import ChoiceFieldOption from './ChoiceFieldOption';

interface ChoiceFieldBaseProps {
  fieldId: string;
  fieldKey: FieldKeyPrefix;
  inputType: 'radio' | 'checkbox';
  isValueDifferent?: boolean;
}

function ChoiceFieldBase({
  fieldId,
  fieldKey,
  inputType,
  isValueDifferent,
}: ChoiceFieldBaseProps) {
  const { register } = useFormContext<FormSchema>();
  const fieldArray = useFieldArray({
    name: `${fieldKey}.props.options`,
  });
  const { append, update, remove, move } = fieldArray;
  const options = fieldArray.fields as (OptionType & { id: string })[];
  const lastInputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleNewOption = () => {
    const name = `Option ${options.length + 1}`;
    append({
      value: name,
      label: name,
    });
    requestAnimationFrame(() => {
      lastInputRef.current?.focus();
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = options.findIndex((item) => item.id === active.id);
    const newIndex = options.findIndex((item) => item.id === over.id);

    move(oldIndex, newIndex);
  };

  return (
    <div className="p-2">
      <input
        {...register(genFieldKey(fieldKey, 'props.label'))}
        className="mb-2 typography-body2 bg-white bg-opacity-0 focus:outline-none cursor-text w-full"
        type="text"
      />
      <div
        id={`${fieldId}-options-container`}
        className="flex flex-col gap-0.5 px-2"
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={options}
            strategy={verticalListSortingStrategy}
          >
            {options.map((option, index) => (
              <ChoiceFieldOption
                key={option.id}
                option={option}
                index={index}
                inputType={inputType}
                fieldId={fieldId}
                isValueDifferent={isValueDifferent}
                onUpdate={update}
                onRemove={remove}
                inputRef={
                  index === options.length - 1 ? lastInputRef : undefined
                }
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <div className="flex items-center gap-2 px-2 mt-2">
        <input type={inputType} disabled />
        <p
          className="typography-body3 text-neutral-400 cursor-text hover:text-neutral-500"
          onClick={handleNewOption}
        >
          Add option
        </p>
      </div>
    </div>
  );
}

export default ChoiceFieldBase;
