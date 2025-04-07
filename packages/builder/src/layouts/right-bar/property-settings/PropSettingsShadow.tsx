import { FaPlus } from 'react-icons/fa';
import { useControllableState } from '../../../lib/hooks/useControllableState';
import { useSchemaStore } from '../../../lib/state/schema.state';
import {
  PropertyType,
  type BoxShadow,
  type BoxShadowProperty,
  type FormField,
} from '@efie-form/core';
import * as Accordion from '@radix-ui/react-accordion';
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
  useSortable,
  arraySwap,
} from '@dnd-kit/sortable';
import { MdOutlineDragIndicator } from 'react-icons/md';
import { HiTrash } from 'react-icons/hi2';
import { ColorPicker, Number, Switch } from '../../../components/form';

const defaultShadowItem: BoxShadow = {
  x: { value: 0, unit: 'px' },
  y: { value: 0, unit: 'px' },
  blur: { value: 0, unit: 'px' },
  spread: { value: 0, unit: 'px' },
  color: '#000000',
  inset: false,
};

interface PropSettingsShadowProps {
  field: FormField;
}

const defaultShadow: BoxShadowProperty = {
  type: PropertyType.BOX_SHADOW,
  value: [
    defaultShadowItem,
  ],
};

export default function PropSettingsShadow({ field }: PropSettingsShadowProps) {
  const { updateFieldProps } = useSchemaStore();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const shadowProp = field.props.find(
    field => field.type === PropertyType.BOX_SHADOW,
  );
  const [shadows, setShadows] = useControllableState({
    onChange: (value) => {
      updateFieldProps(field.id, PropertyType.BOX_SHADOW, value);
    },
    defaultValue: shadowProp || defaultShadow,
  });

  const handleAddShadow = () => {
    setShadows(prev => ({
      ...prev,
      value: [...prev.value, defaultShadowItem],
    }));
  };

  const handleRemoveShadow = (index: number) => {
    setShadows(prev => ({
      ...prev,
      value: prev.value.filter((_, i) => i !== index),
    }));
  };

  const handleMoveShadow = (from: number, to: number) => {
    setShadows(prev => ({
      ...prev,
      value: arraySwap(prev.value, from, to),
    }));
  };

  const handleUpdateShadow = (index: number, shadow: BoxShadow) => {
    setShadows(prev => ({
      ...prev,
      value: prev.value.map((s, i) => i === index ? shadow : s),
    }));

  return (
    <>

      <div className="px-4 py-3.5">
        <div className="flex justify-between items-center">
          <div>
            <p className="typography-body3 text-neutral-800">Shadow</p>
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={handleAddShadow}
              className="hover:bg-neutral-100/80 p-1 rounded-md text-neutral-500 typography-body3"
            >
              <FaPlus />
            </button>
          </div>
        </div>
        <div className="w-full">
          <Accordion.Root type="single" collapsible>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(event) => {
                const { active, over } = event;
                if (!active || !over) return;
                const activeIndex = +active.id;
                const overIndex = +over.id;
                handleMoveShadow(activeIndex, overIndex);
              }}
            >
              <SortableContext items={shadows.value.map((_, index) => index.toString())}>
                {shadows.value.map((shadow, index) => (
                  <ShadowItem
                    key={`${field.id}${index}`}
                    index={index}
                    onDelete={() => handleRemoveShadow(index)}
                    shadow={shadow}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </Accordion.Root>
        </div>
      </div>

      <div className="mx-4">
        <div className="w-full border-t-[0.5px] border-neutral-400 h-[1px]" />
      </div>
    </>
  );
}

interface ShadowItemProps {
  index: number;
  onDelete: () => void;
  shadow: BoxShadow;
}

function ShadowItem({ index, onDelete, shadow }: ShadowItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transition,
    transform,
    isDragging,
  } = useSortable({
    id: index.toString(),
  });

  const style = {
    transform: transform ? `translateY(${transform.y}px)` : undefined,
    zIndex: isDragging ? 50 : undefined,
    transition: transform ? transition : undefined,
  };

  return (
    <div ref={setNodeRef} {...attributes} style={style} className="relative mt-1">
      <Accordion.Item
        value={index.toString()}
        className="data-[state=open]:bg-neutral-100 rounded-lg transition-colors group"
      >
        <div className="flex justify-between items-center hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer">
          <Accordion.Trigger asChild>
            <div className="px-2 py-1 flex items-center gap-2 w-full typography-body3 text-neutral-800">
              <div
                className="invisible group-hover:visible p-1 cursor-grab"
                {...listeners}
              >
                <span>
                  <MdOutlineDragIndicator />
                </span>
              </div>
              <span>
                {shadow?.x.value}
                {shadow?.x.unit}
              </span>
              <span>
                {shadow?.y.value}
                {shadow?.y.unit}
              </span>
              <span>
                {shadow?.blur.value}
                {shadow?.blur.unit}
              </span>
              <span>
                {shadow?.spread.value}
                {shadow?.spread.unit}
              </span>
              <span
                style={{
                  backgroundColor: shadow?.color,
                }}
                className="w-6 h-6 inline-block rounded-lg"
              />
              <span>{shadow?.inset ? 'inset' : ''}</span>
              <span className="flex-1"></span>
            </div>
          </Accordion.Trigger>
          <div
            className="p-1 cursor-pointer invisible group-hover:visible"
            onClick={onDelete}
          >
            <span className="text-danger">
              <HiTrash />
            </span>
          </div>
        </div>
        <Accordion.Content className="accordion-content">
          <div className="grid grid-cols-3 gap-x-2 gap-y-4 px-1.5 py-2">
            <div>
              <p className="typography-body3 text-neutral-700 mb-2">X Offset</p>
              <div>
                <Number
                  value={shadow.x.value}
                  onChange={(newValue) => {
                    //
                  }}
                  suffix="px"
                  suffixType="text"
                />
              </div>
            </div>

            <div>
              <p className="typography-body3 text-neutral-700 mb-2">Y Offset</p>
              <div>
                <Number
                  value={shadow.y.value}
                  onChange={(newValue) => {
                    //
                  }}
                  suffix="px"
                  suffixType="text"
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <p className="typography-body3 text-neutral-700 mb-2">Color</p>
              <div>
                <ColorPicker
                  value={shadow.color}
                  onChange={(newValue) => {
                    //
                  }}
                />
              </div>
            </div>

            <div>
              <p className="typography-body3 text-neutral-700 mb-2">Blur</p>
              <div>
                <Number
                  value={shadow.blur.value}
                  onChange={(newValue) => {
                    //
                  }}
                  suffix="px"
                  suffixType="text"
                />
              </div>
            </div>

            <div>
              <p className="typography-body3 text-neutral-700 mb-2">Spread</p>
              <div>
                <Number
                  value={shadow.spread.value}
                  onChange={(newValue) => {
                    //
                  }}
                  suffix="px"
                  suffixType="text"
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <p className="typography-body3 text-neutral-700 mb-2">Inset</p>
              <div>
                <Switch
                  checked={shadow.inset}
                  onChange={(newValue) => {
                    //
                  }}
                />
              </div>
            </div>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </div>
  );
}
