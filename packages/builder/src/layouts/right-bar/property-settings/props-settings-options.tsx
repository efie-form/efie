import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  isOptionsValue,
  type OptionsProperty,
  type PropValue,
  type PropValueOptions,
} from '@efie-form/core';
import { useRef, useState } from 'react';
import { MdAdd, MdOutlineClose, MdOutlineDragIndicator } from 'react-icons/md';
import Button from '../../../components/elements/button';
import { Input, Switch } from '../../../components/form';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { cn } from '../../../lib/utils';
import type { PropSettingsOption } from '../../../types/prop-settings.type';

interface PropSettingsOptionsProps extends PropSettingsOption {
  fieldId: string;
}

export default function PropsSettingsOptions({ fieldId, label, type }: PropSettingsOptionsProps) {
  const fieldProperty = useSchemaStore((state) => state.getFieldProperty(fieldId, type));
  const updateOptions = useSchemaStore((state) => state.updateFieldProperty);
  const value = getValue(fieldProperty?.value);
  // Store previous values for restoration
  const prevValuesRef = useRef<OptionsProperty['value']>(value.map((option) => ({ ...option })));
  const [isValueDifferent, setIsValueDifferent] = useState(
    value.some((option) => option.value !== option.label) || false,
  );
  // const prevOptionsRef = useRef<OptionsProperty['value']>();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleChangeDifferentValue = (different: boolean) => {
    setIsValueDifferent(different);
    if (different) {
      // Restore previous values if available
      if (prevValuesRef.current && prevValuesRef.current.length === value.length) {
        const restored = value.map((option, i) => ({
          ...option,
          value: prevValuesRef.current[i].value,
        }));
        updateOptions(fieldId, { type, value: restored } as OptionsProperty);
      }
    } else {
      // Save current values for restoration
      prevValuesRef.current = value.map((option) => ({ ...option }));
      // Set value = label for all options
      const newOptions = value.map((option) => ({ ...option, value: option.label }));
      updateOptions(fieldId, { type, value: newOptions } as OptionsProperty);
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) {
      return;
    }
    const oldIndex = Number.parseInt(active.id as string, 10);
    const newIndex = Number.parseInt(over.id as string, 10);
    const newOptions = arrayMove(value, oldIndex, newIndex);
    updateOptions(fieldId, { type, value: newOptions } as OptionsProperty);
  };

  const handleLabelChange = (index: number, changeType: 'value' | 'label', newValue: string) => {
    const newOptions = [...value];
    newOptions[index] = {
      ...newOptions[index],
      [changeType]: newValue,
    };
    updateOptions(fieldId, { type, value: newOptions } as OptionsProperty);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = [...value];
    newOptions.splice(index, 1);
    updateOptions(fieldId, { type, value: newOptions } as OptionsProperty);
  };

  const handleAddOption = () => {
    const totalOptions = value.length;
    const newOptions = [
      ...value,
      { label: `Option ${totalOptions + 1}`, value: `Option ${totalOptions + 1}` },
    ];
    updateOptions(fieldId, { type, value: newOptions } as OptionsProperty);
  };

  return (
    <>
      <div className="px-4 py-3.5">
        <div className="mb-2 flex items-center justify-between">
          <p className="typography-body3 text-neutral-800">{label}</p>
          <div className="flex items-center gap-2">
            <p className="typography-body3 text-neutral-800">Different Value</p>
            <Switch checked={isValueDifferent} onChange={handleChangeDifferentValue} />
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
              items={value.map((_, index) => index.toString())}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-2">
                {value.map((option, index) => (
                  <OptionItem
                    key={index}
                    index={index}
                    option={option}
                    isValueDifferent={isValueDifferent}
                    handleLabelChange={(index, value) => handleLabelChange(index, 'label', value)}
                    handleValueChange={(index, value) => handleLabelChange(index, 'value', value)}
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
        <div className="h-[1px] w-full border-neutral-400 border-t-[0.5px]" />
      </div>
    </>
  );
}

function getValue(props?: PropValue): PropValueOptions {
  if (!isOptionsValue(props)) {
    return [];
  }

  return props
    .filter((option) => option && 'value' in option && 'label' in option)
    .map((option) => ({
      label: option.label,
      value: option.value || option.label,
    }));
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
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: index.toString(),
  });

  const style = {
    transform: transform ? `translateY(${transform.y}px)` : undefined,
    transition: transform ? transition : undefined,
  };

  return (
    <div
      key={index}
      className={cn('group relative flex items-center gap-2', {
        'z-50': isDragging,
      })}
      ref={setNodeRef}
      style={style}
    >
      <div {...attributes} {...listeners} className="cursor-grab">
        <MdOutlineDragIndicator className="text-neutral-500" />
      </div>
      <Input value={option.label} onChange={(value) => handleLabelChange(index, value)} />
      {isValueDifferent && (
        <Input value={option.value} onChange={(value) => handleValueChange(index, value)} />
      )}
      <div className="invisible group-hover:visible">
        <button type="button" onClick={onRemove}>
          <MdOutlineClose className="cursor-pointer text-neutral-500 hover:text-neutral-700" />
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
    <div className="mb-1 flex w-full items-center gap-2">
      <div className="w-4" />
      <p className="typography-body3 flex-1 text-center font-semibold text-neutral-800">Label</p>
      {isValueDifferent && (
        <p className="typography-body3 flex-1 text-center font-semibold text-neutral-800">Value</p>
      )}
      <div className="w-4" />
    </div>
  );
}
