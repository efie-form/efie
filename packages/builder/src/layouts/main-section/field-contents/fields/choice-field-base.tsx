import type { DragEndEvent } from '@dnd-kit/core';
import {
  closestCenter,
  DndContext,
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
import type { FormField, PropValueOptions } from '@efie-form/core';
import { PropertyType } from '@efie-form/core';
import { useRef } from 'react';
import { useSchemaStore } from '../../../../lib/state/schema.state';
import { getFieldProp } from '../../../../lib/utils';
import ChoiceFieldOption from './choice-field-option';

interface ChoiceFieldBaseProps {
  fieldId: string;
  field: FormField;
  inputType: 'radio' | 'checkbox';
}

const DEFAULT_OPTIONS: PropValueOptions = [
  { label: 'Option 1', value: 'Option 1' },
  { label: 'Option 2', value: 'Option 2' },
];

function ChoiceFieldBase({ fieldId, field, inputType }: ChoiceFieldBaseProps) {
  const lastInputRef = useRef<HTMLInputElement>(null);
  const fieldProperty = useSchemaStore((state) =>
    state.getFieldProperty(field.sys.id, PropertyType.LABEL),
  );
  const label = fieldProperty?.value || '';
  const updateFieldProperty = useSchemaStore((state) => state.updateFieldProperty);

  const optionsProperty = useSchemaStore((state) =>
    state.getFieldProperty(field.sys.id, PropertyType.OPTIONS),
  );
  const options = optionsProperty?.value || DEFAULT_OPTIONS;

  const updateOptions = (newOptions: PropValueOptions) => {
    updateFieldProperty(field.sys.id, {
      type: PropertyType.OPTIONS,
      value: newOptions,
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const optionsProp = getFieldProp(field, PropertyType.OPTIONS);
  const isValueDifferent =
    optionsProp?.value.some(
      (option: { label: string; value: string }) => option.value !== option.label,
    ) || false;

  const handleNewOption = () => {
    const name = `Option ${options.length + 1}`;
    const newOptions = [
      ...options,
      {
        value: name,
        label: name,
      },
    ];
    updateOptions(newOptions);
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
    updateOptions(newOptions);
  };

  const handleRemove = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    updateOptions(newOptions);
  };

  const handleUpdate = (index: number, value: PropValueOptions[number]) => {
    const newOptions = [...options];
    newOptions[index] = value;
    updateOptions(newOptions);
  };

  return (
    <div className="p-2">
      <input
        value={label}
        onChange={(e) =>
          updateFieldProperty(field.sys.id, {
            type: PropertyType.LABEL,
            value: e.target.value,
          })
        }
        className="typography-body2 mb-2 w-full cursor-text bg-white bg-opacity-0 focus:outline-none"
        type="text"
      />
      <div id={`${fieldId}-options-container`} className="flex flex-col gap-0.5 px-2">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={options.map((_: { label: string; value: string }, index: number) =>
              index.toString(),
            )}
            strategy={verticalListSortingStrategy}
          >
            {options.map((option: { label: string; value: string }, index: number) => (
              <ChoiceFieldOption
                key={index}
                option={option}
                index={index}
                inputType={inputType}
                fieldId={fieldId}
                isValueDifferent={isValueDifferent}
                onUpdate={(value) => handleUpdate(index, value)}
                onRemove={() => handleRemove(index)}
                inputRef={index === options.length - 1 ? lastInputRef : undefined}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <div className="mt-2 flex items-center gap-2 px-2">
        <input type={inputType} disabled />
        <button
          type="button"
          className="typography-body3 cursor-text text-neutral-400 hover:text-neutral-500"
          onClick={handleNewOption}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleNewOption();
            }
          }}
        >
          Add option
        </button>
      </div>
    </div>
  );
}

export default ChoiceFieldBase;
