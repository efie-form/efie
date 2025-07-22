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
  type BoxShadow,
  type BoxShadowProperty,
  type Color,
  getColorObject,
  isBoxShadowValue,
  type PropValue,
  type PropValueBoxShadow,
  type Size,
  SizeType,
} from '@efie-form/core';
import * as Collapsible from '@radix-ui/react-collapsible';
import { useState } from 'react';
import { MdAdd, MdOutlineDelete, MdOutlineDragIndicator } from 'react-icons/md';
import Button from '../../../components/elements/button';
import { ColorPicker, Switch } from '../../../components/form';
import SizeInput from '../../../components/form/size-input';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { cn } from '../../../lib/utils';
import type { PropSettingsBoxShadow } from '../../../types/prop-settings.type';

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

export default function PropsSettingsBoxShadow({
  fieldId,
  label,
  type,
}: PropsSettingsBoxShadowProps) {
  const boxShadowProperty = useSchemaStore((state) => state.getFieldProperty(fieldId, type));
  const updateBoxShadowProperty = useSchemaStore((state) => state.updateFieldProperty);
  const value = getValue(boxShadowProperty?.value);

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
    const newShadows = arrayMove(value, oldIndex, newIndex);
    updateBoxShadowProperty(fieldId, { type, value: newShadows } as BoxShadowProperty);
  };

  const handleUpdateShadow = (index: number, updates: Partial<BoxShadow>) => {
    const newShadows = [...value];
    newShadows[index] = { ...newShadows[index], ...updates };
    updateBoxShadowProperty(fieldId, { type, value: newShadows } as BoxShadowProperty);
  };

  const handleRemoveShadow = (index: number) => {
    const newShadows = [...value];
    newShadows.splice(index, 1);
    updateBoxShadowProperty(fieldId, { type, value: newShadows } as BoxShadowProperty);
  };

  const handleAddShadow = () => {
    const newShadows = [...value, { ...defaultShadowItem }];
    updateBoxShadowProperty(fieldId, { type, value: newShadows } as BoxShadowProperty);
  };

  return (
    <>
      <div className="px-4 py-3.5">
        <div className="mb-2 flex items-center justify-between">
          <p className="typography-body3 text-neutral-800">{label}</p>
          <Button variant="secondary" startIcon={MdAdd} onClick={handleAddShadow}>
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
              items={value.map((_, index) => index.toString())}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-3">
                {value.map((shadow, index) => (
                  <ShadowItem
                    key={index}
                    index={index}
                    shadow={shadow}
                    onUpdate={(updates) => handleUpdateShadow(index, updates)}
                    onRemove={() => handleRemoveShadow(index)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
          {value.length === 0 && (
            <div className="typography-body3 py-4 text-center text-neutral-500">
              No shadows added. Click "Add" to create your first shadow.
            </div>
          )}
        </div>
      </div>
      <div className="mx-4">
        <div className="h-[1px] w-full border-neutral-400 border-t-[0.5px]" />
      </div>
    </>
  );
}

function getValue(props?: PropValue): PropValueBoxShadow {
  if (!isBoxShadowValue(props)) {
    return [];
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
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: index.toString(),
  });

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

  return (
    <Collapsible.Root
      open={isExpanded}
      onOpenChange={setIsExpanded}
      className={cn(
        'group relative overflow-hidden rounded-lg border border-neutral-200 bg-white',
        {
          'z-50': isDragging,
        },
      )}
      ref={setNodeRef}
      style={style}
    >
      {/* Header */}
      <Collapsible.Trigger asChild>
        <div className="flex cursor-pointer items-center justify-between rounded-t-lg px-2 py-1.5 hover:bg-neutral-50">
          <div className="flex items-center gap-2">
            <div
              className="cursor-grab rounded p-1 hover:bg-neutral-100"
              {...attributes}
              {...listeners}
              onClick={(e) => e.stopPropagation()}
            >
              <MdOutlineDragIndicator className="text-neutral-500" />
            </div>
            <div className="typography-body3 flex items-center gap-2 text-neutral-800">
              <span>{sizeToString(shadow.x)}</span>
              <span>{sizeToString(shadow.y)}</span>
              <span>{sizeToString(shadow.blur)}</span>
              <span>{sizeToString(shadow.spread)}</span>
              <div
                className="h-4 w-4 rounded border border-neutral-300"
                style={{ backgroundColor: shadow.color.hex }}
              />
              {shadow.inset && (
                <span className="rounded bg-neutral-100 px-1 py-0.5 text-xs">inset</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="invisible rounded p-1 hover:bg-neutral-100 group-hover:visible"
            >
              <MdOutlineDelete className="text-neutral-500 hover:text-danger" />
            </button>
          </div>
        </div>
      </Collapsible.Trigger>

      {/* Expanded Content */}
      <Collapsible.Content className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        <div className="space-y-4 border-neutral-200 border-t p-3">
          {/* Position and Blur */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="typography-body3 mb-1 block text-neutral-700">X Offset</label>
              <SizeInput
                value={shadow.x}
                onChange={(newSize) => handleSizeUpdate('x', newSize)}
                className="w-full"
              />
            </div>
            <div>
              <label className="typography-body3 mb-1 block text-neutral-700">Y Offset</label>
              <SizeInput
                value={shadow.y}
                onChange={(newSize) => handleSizeUpdate('y', newSize)}
                className="w-full"
              />
            </div>
            <div>
              <label className="typography-body3 mb-1 block text-neutral-700">Blur</label>
              <SizeInput
                value={shadow.blur}
                onChange={(newSize) => handleSizeUpdate('blur', newSize)}
                className="w-full"
              />
            </div>
            <div>
              <label className="typography-body3 mb-1 block text-neutral-700">Spread</label>
              <SizeInput
                value={shadow.spread}
                onChange={(newSize) => handleSizeUpdate('spread', newSize)}
                className="w-full"
              />
            </div>
          </div>

          {/* Color and Inset */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="typography-body3 mb-1 block text-neutral-700">Color</label>
              <ColorPicker value={getColorObject(shadow.color.hex)} onChange={handleColorUpdate} />
            </div>
            <div>
              <label className="typography-body3 mb-1 block text-neutral-700">Inset</label>
              <div className="flex h-7 items-center">
                <Switch checked={shadow.inset} onChange={handleInsetToggle} />
              </div>
            </div>
          </div>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
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
