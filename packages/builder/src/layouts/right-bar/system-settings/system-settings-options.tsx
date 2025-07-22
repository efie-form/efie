import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Input, Switch } from '../../../components/form';
import { type FieldSystemConfigOptions, type PropValueOptions } from '@efie-form/core';
import Button from '../../../components/elements/button';
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { MdAdd, MdOutlineClose, MdOutlineDragIndicator } from 'react-icons/md';
import { cn } from '../../../lib/utils';
import { useState, useRef } from 'react';
import { useSchemaStore } from '../../../lib/state/schema.state';

interface PropSettingsOptionsProps {
  config: FieldSystemConfigOptions;
  fieldId: string;
}

export default function SystemSettingsOptions({
  config,
  fieldId,
}: PropSettingsOptionsProps) {
  const fieldProperty = useSchemaStore(state => state.getFieldProperty(fieldId, config.type));
  const value = fieldProperty?.value || [];
  const updateFieldProperty = useSchemaStore(state => state.updateFieldProperty);

  // Store previous values for restoration
  const prevValuesRef = useRef(value.map(option => ({ ...option })));
  const [isValueDifferent, setIsValueDifferent] = useState(
    value.some(option => option.value !== option.label) || false,
  );
  // const prevOptionsRef = useRef<OptionsProperty['value']>();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onChange = (newValue: PropValueOptions) => {
    updateFieldProperty(fieldId, {
      type: config.type,
      value: newValue,
    });
  };

  const handleChangeDifferentValue = (different: boolean) => {
    setIsValueDifferent(different);
    if (different) {
      // Restore previous values if available
      if (prevValuesRef.current && prevValuesRef.current.length === value.length) {
        const restored = value.map((option, i) => ({
          ...option,
          value: prevValuesRef.current[i].value,
        }));
        onChange(restored);
      }
    }
    else {
      // Save current values for restoration
      prevValuesRef.current = value.map(option => ({ ...option }));
      // Set value = label for all options
      const newOptions = value.map(option => ({ ...option, value: option.label }));
      onChange(newOptions);
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) {
      return;
    }
    const oldIndex = Number.parseInt(active.id as string, 10);
    const newIndex = Number.parseInt(over.id as string, 10);
    const newOptions = arrayMove(value, oldIndex, newIndex);
    onChange(newOptions);
  };

  const handleLabelChange = (index: number, changeType: 'value' | 'label', newValue: string) => {
    const newOptions = [...value];
    newOptions[index] = {
      ...newOptions[index],
      [changeType]: newValue,
    };
    onChange(newOptions);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = [...value];
    newOptions.splice(index, 1);
    onChange(newOptions);
  };

  const handleAddOption = () => {
    const totalOptions = value.length;
    const newOptions = [...value, { label: `Option ${totalOptions + 1}`, value: `Option ${totalOptions + 1}` }];
    onChange(newOptions);
  };

  return (
    <>
      <div className="px-4 py-3.5">
        <div className="mb-2 flex justify-between items-center">
          <p className="typography-body3 text-neutral-800">{config.label}</p>
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
        <div className="w-full border-t-[0.5px] border-neutral-400 h-[1px]" />
      </div>
    </>
  );
}

interface OptionItemProps {
  index: number;
  option: { label: string; value: string };
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
        onChange={value => handleLabelChange(index, value)}
      />
      {isValueDifferent && (
        <Input
          value={option.value}
          onChange={value => handleValueChange(index, value)}
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
