import {
  PropertyType,
  type FormField,
  type OptionsProperty,
} from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { useControllableState } from '../../../lib/hooks/useControllableState';
import { Input, Switch } from '../../../components/form';
import { useRef, useState } from 'react';
import { MdAdd, MdOutlineClose, MdOutlineDragIndicator } from 'react-icons/md';
import Button from '../../../components/elements/Button';
import { DndContext } from '../../../components/dnd-kit';
import {
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableContext } from '@dnd-kit/sortable';
import { cn, getFieldProp } from '../../../lib/utils';
import {
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';

interface PropSettingsOptionProps {
  field: FormField;
}

const defaultOption: OptionsProperty = {
  type: PropertyType.OPTIONS,
  value: [
    {
      label: 'Option 1',
      value: 'Option 1',
    },
    {
      label: 'Option 2',
      value: 'Option 2',
    },
    {
      label: 'Option 3',
      value: 'Option 3',
    },
  ],
  errorMessage: '',
};

export default function PropSettingsOption({ field }: PropSettingsOptionProps) {
  const { updateFieldProps } = useSchemaStore();
  const optionsProp = getFieldProp(field, PropertyType.OPTIONS);
  const [isValueDifferent, setIsValueDifferent] = useState(
    optionsProp?.value?.some((option) => option.value !== option.label) || false
  );
  const [options, setOptions] = useControllableState({
    onChange: (value) => {
      updateFieldProps(field.id, PropertyType.OPTIONS, value);
    },
    defaultValue: optionsProp || defaultOption,
  });
  const prevOptionsRef = useRef<OptionsProperty['value']>();

  const handleChangeDifferentValue = (value: boolean) => {
    setIsValueDifferent(value);
    if (value) {
      setOptions((prev) => ({
        ...prev,
        value: prev.value.map((option, index) => ({
          ...option,
          value:
            prevOptionsRef.current?.find((_, i) => i === index)?.value ||
            option.value,
        })),
      }));
    } else {
      prevOptionsRef.current = options.value;

      setOptions((prev) => ({
        ...prev,
        value: prev.value.map((option) => ({
          ...option,
          value: option.label,
        })),
      }));
    }
  };

  const handleLabelChange = (index: number, value: string) => {
    const newOptions = [...options.value];
    newOptions[index].label = value;
    if (!isValueDifferent) {
      newOptions[index].value = value;
    }
    setOptions({ ...options, value: newOptions });
  };

  const handleValueChange = (index: number, value: string) => {
    const newOptions = [...options.value];
    newOptions[index].value = value;
    setOptions({ ...options, value: newOptions });
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = [...options.value];
    newOptions.splice(index, 1);
    setOptions({ ...options, value: newOptions });
  };

  const handleAddOption = () => {
    const newOptions = [...options.value];
    const name = `Option ${newOptions.length + 1}`;
    newOptions.push({ label: name, value: name });
    setOptions({ ...options, value: newOptions });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setOptions((prev) => ({
        ...prev,
        value: arrayMove(prev.value, Number(active.id), Number(over?.id)),
      }));
    }
  };

  return (
    <>
      <div className="px-4 py-3.5">
        <div className="mb-2 flex justify-between items-center">
          <p className="typography-body3 text-neutral-800">Options</p>
          <div className="flex items-center gap-2">
            <p className="typography-body3 text-neutral-800">Different Value</p>
            <Switch
              checked={isValueDifferent}
              onChange={handleChangeDifferentValue}
            />
          </div>
        </div>
        <div>
          <OptionTitle isValueDifferent={isValueDifferent} />
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={options.value.map((_, index) => index.toString())}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-2">
                {options.value.map((option, index) => (
                  <OptionItem
                    key={index}
                    index={index}
                    option={option}
                    isValueDifferent={isValueDifferent}
                    handleLabelChange={handleLabelChange}
                    handleValueChange={handleValueChange}
                    onRemove={() => handleRemoveOption(index)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
          <div className="mt-2">
            <Button
              variant="secondary"
              className="w-full"
              startIcon={MdAdd}
              onClick={handleAddOption}
            >
              Add option
            </Button>
          </div>
        </div>
      </div>
      <div className="mx-4">
        <div className="w-full border-t-[0.5px] border-neutral-400 h-[1px]" />
      </div>
    </>
  );
}

interface OptionItemProps {
  index: number;
  option: OptionsProperty['value'][number];
  isValueDifferent: boolean;
  handleLabelChange: (index: number, value: string) => void;
  handleValueChange: (index: number, value: string) => void;
  onRemove: () => void;
}

function OptionItem({
  index,
  option,
  isValueDifferent,
  handleLabelChange,
  handleValueChange,
  onRemove,
}: OptionItemProps) {
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
  };

  return (
    <div
      key={index}
      className={cn('flex gap-2 items-center group relative', {
        'z-50': isDragging,
      })}
      ref={setNodeRef}
      style={style}
    >
      <div {...attributes} {...listeners} className="cursor-grab">
        <MdOutlineDragIndicator className="text-neutral-500" />
      </div>
      <Input
        value={option.label}
        onChange={(value) => handleLabelChange(index, value)}
      />
      {isValueDifferent && (
        <Input
          value={option.value}
          onChange={(value) => handleValueChange(index, value)}
        />
      )}
      <div className="invisible group-hover:visible">
        <button onClick={onRemove}>
          <MdOutlineClose className="text-neutral-500 cursor-pointer hover:text-neutral-700" />
        </button>
      </div>
    </div>
  );
}

interface OptionTitleProps {
  isValueDifferent: boolean;
}

function OptionTitle({ isValueDifferent }: OptionTitleProps) {
  return (
    <div className="flex gap-2 items-center w-full mb-1">
      <div className="w-4" />
      <p className="typography-body3 text-neutral-800 flex-1 text-center font-semibold">
        Label
      </p>
      {isValueDifferent && (
        <p className="typography-body3 text-neutral-800 flex-1 text-center font-semibold">
          Value
        </p>
      )}
      <div className="w-4" />
    </div>
  );
}
