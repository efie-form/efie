import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Switch } from '../../../components/form';
import type { PropSettingsBoxShadow } from '../../../types/prop-settings.type';
import { type BoxShadowProperty, type PropertyDefinition, type BoxShadow, type Size, SizeType, isBoxShadowValue, type Color } from '@efie-form/core';
import Button from '../../../components/elements/Button';
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { MdAdd, MdOutlineClose, MdOutlineDragIndicator } from 'react-icons/md';
import { cn } from '../../../lib/utils';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { useCallback, useState } from 'react';
import ColorPicker2 from '../../../components/form/color-picker-2';
import SizeInput from '../../../components/form/SizeInput';
import { getColorObject } from '../../../lib/colors';

interface PropsSettingsBoxShadowProps extends PropSettingsBoxShadow {
  fieldId: string;
}

const defaultShadowItem: BoxShadow = {
  x: { type: SizeType.LENGTH, value: 0, unit: 'px' },
  y: { type: SizeType.LENGTH, value: 4, unit: 'px' },
  blur: { type: SizeType.LENGTH, value: 6, unit: 'px' },
  spread: { type: SizeType.LENGTH, value: 0, unit: 'px' },
  color: getColorObject('#000000'),
  inset: false,
};

export default function PropsSettingsBoxShadow({ fieldId, label, type }: PropsSettingsBoxShadowProps) {
  const boxShadowProperty = useSchemaStore(
    useCallback(state => state.getFieldProperty(fieldId, type), [fieldId, type]),
  );
  const updateBoxShadowProperty = useSchemaStore(state => state.updateFieldProperty);
  const value = getValue(boxShadowProperty);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) {
      return;
    }
    const oldIndex = Number.parseInt(active.id as string, 10);
    const newIndex = Number.parseInt(over.id as string, 10);
    const newShadows = arrayMove(value.value, oldIndex, newIndex);
    updateBoxShadowProperty(fieldId, { type, value: newShadows } as BoxShadowProperty);
  };

  const handleUpdateShadow = (index: number, updates: Partial<BoxShadow>) => {
    const newShadows = [...value.value];
    newShadows[index] = { ...newShadows[index], ...updates };
    updateBoxShadowProperty(fieldId, { type, value: newShadows } as BoxShadowProperty);
  };

  const handleRemoveShadow = (index: number) => {
    const newShadows = [...value.value];
    newShadows.splice(index, 1);
    updateBoxShadowProperty(fieldId, { type, value: newShadows } as BoxShadowProperty);
  };

  const handleAddShadow = () => {
    const newShadows = [...value.value, { ...defaultShadowItem }];
    updateBoxShadowProperty(fieldId, { type, value: newShadows } as BoxShadowProperty);
  };

  return (
    <>
      <div className="px-4 py-3.5">
        <div className="mb-2 flex justify-between items-center">
          <p className="typography-body3 text-neutral-800">{label}</p>
          <Button
            variant="secondary"
            startIcon={MdAdd}
            onClick={handleAddShadow}
          >
            Add
          </Button>
        </div>
        <div>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={value.value.map((_, index) => index.toString())}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-3">
                {value.value.map((shadow, index) => (
                  <ShadowItem
                    key={index}
                    index={index}
                    shadow={shadow}
                    onUpdate={updates => handleUpdateShadow(index, updates)}
                    onRemove={() => handleRemoveShadow(index)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
          {value.value.length === 0 && (
            <div className="text-center py-4 text-neutral-500 typography-body3">
              No shadows added. Click "Add" to create your first shadow.
            </div>
          )}
        </div>
      </div>
      <div className="mx-4">
        <div className="w-full border-t-[0.5px] border-neutral-400 h-[1px]" />
      </div>
    </>
  );
}

function getValue(props?: PropertyDefinition): BoxShadowProperty {
  if (!isBoxShadowValue(props)) {
    return { type: 'boxShadow', value: [] };
  }

  return props;
}

interface ShadowItemProps {
  index: number;
  shadow: BoxShadow;
  onUpdate: (updates: Partial<BoxShadow>) => void;
  onRemove: () => void;
}

function ShadowItem({ index, shadow, onUpdate, onRemove }: ShadowItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: index.toString() });

  const [isExpanded, setIsExpanded] = useState(false);

  const style = {
    transform: transform ? `translateY(${transform.y}px)` : undefined,
    transition: transform ? transition : undefined,
  };

  const handleSizeUpdate = (property: 'x' | 'y' | 'blur' | 'spread', newSize: Size) => {
    onUpdate({ [property]: newSize });
  };

  const handleColorUpdate = (newColor: Color) => {
    onUpdate({ color: newColor });
  };

  const handleInsetToggle = (isInset: boolean) => {
    onUpdate({ inset: isInset });
  };

  console.log('ShadowItem render', shadow);

  return (
    <div
      key={index}
      className={cn('border border-neutral-200 rounded-lg bg-white group relative', {
        'z-50': isDragging,
      })}
      ref={setNodeRef}
      style={style}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-3 cursor-pointer hover:bg-neutral-50 rounded-t-lg"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <div
            className="cursor-grab p-1 hover:bg-neutral-100 rounded"
            {...attributes}
            {...listeners}
            onClick={e => e.stopPropagation()}
          >
            <MdOutlineDragIndicator className="text-neutral-500" />
          </div>
          <div className="flex items-center gap-2 typography-body3 text-neutral-800">
            <span>
              {sizeToString(shadow.x)}
            </span>
            <span>
              {sizeToString(shadow.y)}
            </span>
            <span>
              {sizeToString(shadow.blur)}
            </span>
            <span>
              {sizeToString(shadow.spread)}
            </span>
            <div
              className="w-4 h-4 rounded border border-neutral-300"
              style={{ backgroundColor: shadow.color.hex }}
            />
            {shadow.inset && <span className="text-xs px-1 py-0.5 bg-neutral-100 rounded">inset</span>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500">
            {isExpanded ? '▼' : '▶'}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="invisible group-hover:visible p-1 hover:bg-neutral-100 rounded"
          >
            <MdOutlineClose className="text-neutral-500 hover:text-neutral-700" />
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-neutral-200 p-3 space-y-4">
          {/* Position and Blur */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="typography-body3 text-neutral-700 mb-1 block">X Offset</label>
              <SizeInput
                value={shadow.x}
                onChange={newSize => handleSizeUpdate('x', newSize)}
                className="w-full"
              />
            </div>
            <div>
              <label className="typography-body3 text-neutral-700 mb-1 block">Y Offset</label>
              <SizeInput
                value={shadow.y}
                onChange={newSize => handleSizeUpdate('y', newSize)}
                className="w-full"
              />
            </div>
            <div>
              <label className="typography-body3 text-neutral-700 mb-1 block">Blur</label>
              <SizeInput
                value={shadow.blur}
                onChange={newSize => handleSizeUpdate('blur', newSize)}
                className="w-full"
              />
            </div>
            <div>
              <label className="typography-body3 text-neutral-700 mb-1 block">Spread</label>
              <SizeInput
                value={shadow.spread}
                onChange={newSize => handleSizeUpdate('spread', newSize)}
                className="w-full"
              />
            </div>
          </div>

          {/* Color and Inset */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="typography-body3 text-neutral-700 mb-1 block">Color</label>
              <ColorPicker2
                value={getColorObject(shadow.color.hex)}
                onChange={handleColorUpdate}
              />
            </div>
            <div>
              <label className="typography-body3 text-neutral-700 mb-1 block">Inset</label>
              <div className="flex items-center h-7">
                <Switch
                  checked={shadow.inset}
                  onChange={handleInsetToggle}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function sizeToString(size: Size): string {
  switch (size.type) {
    case SizeType.LENGTH: {
      return `${size.value}${size.unit}`;
    }
    case SizeType.PERCENTAGE: {
      return `${size.value}%`;
    }
    default: {
      return '';
    }
  }
}
//
