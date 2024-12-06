import type { FieldKeyPrefix } from '../../lib/genFieldKey.ts';
import genFieldKey from '../../lib/genFieldKey.ts';
import { FaPlus } from 'react-icons/fa';
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import type { FormSchema } from '@efie-form/core';
import ColorPicker from '../form/ColorPicker.tsx';
import Switch from '../form/Switch.tsx';
import Number from '../form/Number.tsx';
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

interface SettingsFieldShadowProps {
  label: string;
  fieldKey: FieldKeyPrefix;
  divider?: boolean;
}

function SettingsFieldShadow({
  label,
  fieldKey,
  divider,
}: SettingsFieldShadowProps) {
  const { control } = useFormContext<FormSchema>();

  // @ts-expect-error - ignore infinite
  const { move, fields, append, remove } = useFieldArray({
    control,
    name: genFieldKey(fieldKey, 'props.boxShadow'),
  });
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <>
      <div className="px-4 py-3.5">
        <div className="flex justify-between items-center">
          <div>
            <p className="typography-body3 text-neutral-800">{label}</p>
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => {
                append({
                  x: 0,
                  y: 0,
                  blur: 0,
                  spread: 0,
                  color: '#000000',
                  inset: false,
                });
              }}
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
                const indexOfActive = fields.findIndex(
                  (field) => field.id === active.id
                );
                const indexOfOver = fields.findIndex(
                  (field) => field.id === over.id
                );
                move(indexOfActive, indexOfOver);
              }}
            >
              <SortableContext items={fields.map((field) => field.id)}>
                {fields?.map((shadow, index) => (
                  <ShadowItem
                    key={`${fieldKey}${shadow.id}`}
                    id={shadow.id}
                    fieldKey={fieldKey}
                    index={index}
                    onDelete={() => remove(index)}
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
  id: string;
  fieldKey: FieldKeyPrefix;
  index: number;
  onDelete: () => void;
}

function ShadowItem({ id, index, fieldKey, onDelete }: ShadowItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transition,
    transform,
    isDragging,
  } = useSortable({
    id,
  });
  const shadow = useWatch({
    name: genFieldKey(fieldKey, `props.boxShadow.${index}`),
  });
  const style = {
    transform: transform ? `translate3d(0px, ${transform.y}px, 0)` : undefined,
    zIndex: isDragging ? 50 : undefined,
    transition: transform ? transition : undefined,
  };

  return (
    <div ref={setNodeRef} {...attributes} style={style} className="relative">
      <Accordion.Item
        value={id}
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
                <Controller
                  key={`${fieldKey}.props.boxShadow.${index}.x`}
                  render={({ field: { value, onChange } }) => (
                    <Number
                      value={value}
                      onChange={onChange}
                      suffix="px"
                      suffixType="text"
                    />
                  )}
                  name={genFieldKey(fieldKey, `props.boxShadow.${index}.x`)}
                />
              </div>
            </div>

            <div>
              <p className="typography-body3 text-neutral-700 mb-2">Y Offset</p>
              <div>
                <Controller
                  key={`${fieldKey}.props.boxShadow.${index}.y`}
                  render={({ field: { value, onChange } }) => (
                    <Number
                      value={value}
                      onChange={onChange}
                      suffix="px"
                      suffixType="text"
                    />
                  )}
                  name={genFieldKey(fieldKey, `props.boxShadow.${index}.y`)}
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <p className="typography-body3 text-neutral-700 mb-2">Color</p>
              <div>
                <Controller
                  key={`${fieldKey}.props.boxShadow.${index}.color`}
                  render={({ field: { value, onChange } }) => (
                    <ColorPicker value={value} onChange={onChange} />
                  )}
                  name={genFieldKey(fieldKey, `props.boxShadow.${index}.color`)}
                />
              </div>
            </div>

            <div>
              <p className="typography-body3 text-neutral-700 mb-2">Blur</p>
              <div>
                <Controller
                  key={`${fieldKey}.props.boxShadow.${index}.blue`}
                  render={({ field: { value, onChange } }) => (
                    <Number
                      value={value}
                      onChange={onChange}
                      suffix="px"
                      suffixType="text"
                    />
                  )}
                  name={genFieldKey(fieldKey, `props.boxShadow.${index}.blur`)}
                />
              </div>
            </div>

            <div>
              <p className="typography-body3 text-neutral-700 mb-2">Spread</p>
              <div>
                <Controller
                  key={`${fieldKey}.props.boxShadow.${index}.spread`}
                  render={({ field: { value, onChange } }) => (
                    <Number
                      value={value}
                      onChange={onChange}
                      suffix="px"
                      suffixType="text"
                    />
                  )}
                  name={genFieldKey(
                    fieldKey,
                    `props.boxShadow.${index}.spread`
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <p className="typography-body3 text-neutral-700 mb-2">Inset</p>
              <div>
                <Controller
                  key={`${fieldKey}.props.boxShadow.${index}.inset`}
                  render={({ field: { value, onChange } }) => (
                    <Switch checked={value} onChange={onChange} />
                  )}
                  name={genFieldKey(fieldKey, `props.boxShadow.${index}.inset`)}
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
