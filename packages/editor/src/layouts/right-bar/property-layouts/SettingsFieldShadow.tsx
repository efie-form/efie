import { FaPlus } from 'react-icons/fa';
import type { BoxShadow, FormField } from '@efie-form/core';
import ColorPicker from '../../../components/form/ColorPicker.tsx';
import Switch from '../../../components/form/Switch.tsx';
import Number from '../../../components/form/Number.tsx';
import * as Accordion from '@radix-ui/react-accordion';
import { MdOutlineDragIndicator } from 'react-icons/md';
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
} from '@dnd-kit/sortable';
import { HiTrash } from 'react-icons/hi2';
import { useSchemaStore } from '../../../lib/state/schema.state.ts';

interface SettingsFieldShadowProps {
  label: string;
  divider?: boolean;
  field: FormField;
}

function SettingsFieldShadow({
  label,
  field,
  divider,
}: SettingsFieldShadowProps) {
  const { updateFieldProps } = useSchemaStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (!('boxShadow' in field.props)) return <></>;
  const shadows = field.props.boxShadow;

  const handleAddShadow = () => {
    if (!('boxShadow' in field.props)) return;
    const shadows = field.props.boxShadow;

    const newShadow = {
      x: 0,
      y: 0,
      blur: 0,
      spread: 0,
      color: '#000000',
      inset: false,
    };
    shadows.push(newShadow);
    updateFieldProps(field.id, 'props.boxShadow', shadows);
  };

  const handleRemoveShadow = (index: number) => {
    if (!('boxShadow' in field.props)) return;
    const shadows = field.props.boxShadow;
    shadows.splice(index, 1);
    updateFieldProps(field.id, 'props.boxShadow', shadows);
  };

  const handleMoveShadow = (from: number, to: number) => {
    if (!('boxShadow' in field.props)) return;
    const shadows = field.props.boxShadow;
    const [removed] = shadows.splice(from, 1);
    shadows.splice(to, 0, removed);
    updateFieldProps(field.id, 'props.boxShadow', shadows);
  };

  return (
    <>
      <div className="px-4 py-3.5">
        <div className="flex justify-between items-center">
          <div>
            <p className="typography-body3 text-neutral-800">{label}</p>
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
                handleMoveShadow(
                  Number.parseInt(active.id as string, 10),
                  Number.parseInt(over.id as string, 10)
                );
              }}
            >
              <SortableContext items={shadows.map((_, index) => index)}>
                {shadows?.map((shadow, index) => (
                  <ShadowItem
                    key={`${field.id}${index}`}
                    index={index}
                    onDelete={() => handleRemoveShadow(index)}
                    field={field}
                    shadow={shadow}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </Accordion.Root>
        </div>
      </div>

      {divider && (
        <div className="mx-4">
          <div className="w-full border-t-[0.5px] border-neutral-400 h-[1px]" />
        </div>
      )}
    </>
  );
}

interface ShadowItemProps {
  index: number;
  onDelete: () => void;
  field: FormField;
  shadow: BoxShadow;
}

function ShadowItem({ index, onDelete, field, shadow }: ShadowItemProps) {
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
  const { updateFieldProps } = useSchemaStore();

  const style = {
    transform: transform ? `translate3d(0px, ${transform.y}px, 0)` : undefined,
    zIndex: isDragging ? 50 : undefined,
    transition: transform ? transition : undefined,
  };

  return (
    <div ref={setNodeRef} {...attributes} style={style} className="relative">
      <Accordion.Item
        value={index.toString()}
        className="data-[state=open]:bg-neutral-100 rounded-lg transition-colors group"
      >
        <Accordion.Trigger asChild>
          <div className="px-2 py-1 flex items-center gap-2 w-full typography-body3 text-neutral-800 hover:bg-neutral-100 rounded-lg cursor-pointer transition-colors">
            <div
              className="invisible group-hover:visible p-1 cursor-grab"
              {...listeners}
            >
              <span>
                <MdOutlineDragIndicator />
              </span>
            </div>
            <span>{shadow?.x}px</span>
            <span>{shadow?.y}px</span>
            <span>{shadow?.blur}px</span>
            <span>{shadow?.spread}px</span>
            <span
              style={{
                backgroundColor: shadow?.color,
              }}
              className="w-6 h-6 inline-block rounded-lg"
            />
            <span>{shadow?.inset ? 'inset' : ''}</span>
            <span className="flex-1"></span>
            <div
              className="p-1 cursor-pointer invisible group-hover:visible"
              onClick={onDelete}
            >
              <HiTrash />
            </div>
          </div>
        </Accordion.Trigger>
        <Accordion.Content className="accordion-content">
          <div className="grid grid-cols-3 gap-x-2 gap-y-4 px-1.5 py-2">
            <div>
              <p className="typography-body3 text-neutral-700 mb-2">X Offset</p>
              <div>
                <Number
                  value={shadow.x}
                  onChange={(newValue) => {
                    updateFieldProps(
                      field.id,
                      `props.boxShadow.${index}.x`,
                      newValue
                    );
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
                  value={shadow.y}
                  onChange={(newValue) => {
                    updateFieldProps(
                      field.id,
                      `props.boxShadow.${index}.y`,
                      newValue
                    );
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
                    updateFieldProps(
                      field.id,
                      `props.boxShadow.${index}.color`,
                      newValue
                    );
                  }}
                />
              </div>
            </div>

            <div>
              <p className="typography-body3 text-neutral-700 mb-2">Blur</p>
              <div>
                <Number
                  value={shadow.blur}
                  onChange={(newValue) => {
                    updateFieldProps(
                      field.id,
                      `props.boxShadow.${index}.blur`,
                      newValue
                    );
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
                  value={shadow.spread}
                  onChange={(newValue) => {
                    updateFieldProps(
                      field.id,
                      `props.boxShadow.${index}.spread`,
                      newValue
                    );
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
                    updateFieldProps(
                      field.id,
                      `props.boxShadow.${index}.inset`,
                      newValue
                    );
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

export default SettingsFieldShadow;
