import type { FormField, PropertyDefinition } from '@efie-form/core';
import { PropertyType } from '@efie-form/core';
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
import { useControllableState } from '../../../../lib/hooks/useControllableState';
import { useFieldLabel } from '../../../../lib/hooks/properties/useFieldLabel';

interface OptionType {
  value: string;
  label: string;
}

interface ChoiceFieldBaseProps {
  fieldId: string;
  field: FormField;
  inputType: 'radio' | 'checkbox';
}

function ChoiceFieldBase({ fieldId, field, inputType }: ChoiceFieldBaseProps) {
  const { updateFieldProps } = useSchemaStore();
  const lastInputRef = useRef<HTMLInputElement>(null);

  const { label, updateLabel } = useFieldLabel(field);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const optionsProp = field.props.find(
    (prop: PropertyDefinition) => prop.type === PropertyType.OPTIONS
  );
  const isValueDifferent = optionsProp?.value.some(
    (option) => option.value !== option.label
  );

  const [options, setOptions] = useControllableState({
    defaultValue: optionsProp?.value || [],
    onChange: (value) => {
      updateFieldProps(field.id, PropertyType.OPTIONS, {
        ...optionsProp,
        value,
      });
    },
  });

  const handleNewOption = () => {
    const name = `Option ${options.length + 1}`;
    const newOptions = [
      ...options,
      {
        value: name,
        label: name,
      },
    ];
    setOptions(newOptions);
    requestAnimationFrame(() => {
      lastInputRef.current?.focus();
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = Number(active.id);
    const newIndex = Number(over.id);

    const newOptions = [...options];
    const [removed] = newOptions.splice(oldIndex, 1);
    newOptions.splice(newIndex, 0, removed);
    setOptions(newOptions);
  };

  const handleRemove = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleUpdate = (index: number, value: OptionType) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div className="p-2">
      <input
        value={label}
        onChange={(e) => updateLabel(e.target.value)}
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
            items={options.map((_, index) => index.toString())}
            strategy={verticalListSortingStrategy}
          >
            {options.map((option, index) => (
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
