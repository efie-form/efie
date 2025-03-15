import type {
  FormFieldMultipleChoices,
  FormFieldSingleChoice,
  OptionType,
} from '@efie-form/core';
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
import { useSchemaStore } from '../../../../lib/state/schema.state';

interface ChoiceFieldBaseProps {
  fieldId: string;
  field: FormFieldSingleChoice | FormFieldMultipleChoices;
  inputType: 'radio' | 'checkbox';
  isValueDifferent?: boolean;
}

function ChoiceFieldBase({
  fieldId,
  field,
  inputType,
  isValueDifferent,
}: ChoiceFieldBaseProps) {
  const { updateFieldProps } = useSchemaStore();

  const lastInputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleNewOption = () => {
    const name = `Option ${field.props.options.length + 1}`;
    const newOptions = [
      ...field.props.options,
      {
        value: name,
        label: name,
      },
    ];
    updateFieldProps(field.id, 'props.options', newOptions);
    requestAnimationFrame(() => {
      lastInputRef.current?.focus();
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = Number(active.id);
    const newIndex = Number(over.id);

    const newOptions = [...field.props.options];
    const [removed] = newOptions.splice(oldIndex, 1);
    newOptions.splice(newIndex, 0, removed);
    updateFieldProps(field.id, 'props.options', newOptions);
  };

  const handleRemove = (index: number) => {
    const newOptions = [...field.props.options];
    newOptions.splice(index, 1);
    updateFieldProps(field.id, 'props.options', newOptions);
  };

  const handleUpdate = (index: number, value: OptionType) => {
    const newOptions = [...field.props.options];
    newOptions[index] = value;
    updateFieldProps(field.id, 'props.options', newOptions);
  };

  return (
    <div className="p-2">
      <input
        value={field.props.label}
        onChange={(e) => {
          updateFieldProps(field.id, 'props.label', e.target.value);
        }}
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
            items={field.props.options.map((_, index) => index.toString())}
            strategy={verticalListSortingStrategy}
          >
            {field.props.options.map((option, index) => (
              <ChoiceFieldOption
                key={index}
                option={option}
                index={index}
                inputType={inputType}
                fieldId={fieldId}
                isValueDifferent={isValueDifferent}
                onUpdate={(value) => handleUpdate(index, value)}
                onRemove={() => handleRemove(index)}
                inputRef={
                  index === field.props.options.length - 1
                    ? lastInputRef
                    : undefined
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
