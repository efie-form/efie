import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
  draggable,
  dropTargetForElements,
  type ElementDropTargetEventBasePayload,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {
  attachInstruction,
  extractInstruction,
  type Operation,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/list-item';
import { FieldType, type FormField } from '@efie-form/core';
import { type MouseEvent, useEffect, useRef, useState } from 'react';
import { AiOutlineDrag } from 'react-icons/ai';
import { HiTrash } from 'react-icons/hi2';
import invariant from 'tiny-invariant';
import { RIGHT_BAR_TABS } from '../../../lib/constant';
import useDropField from '../../../lib/hooks/use-drop-field';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { useSettingsStore } from '../../../lib/state/settings.state';
import { cn } from '../../../lib/utils';
import {
  BlockField,
  ButtonField,
  DateField,
  DateTimeField,
  DividerField,
  FileField,
  HeadingField,
  ImageField,
  LongTextField,
  MultipleChoicesField,
  NumberField,
  RowField,
  ShortTextField,
  SingleChoiceField,
  TimeField,
} from './fields';
import ColumnsField from './fields/column-field';

interface RenderFieldProps {
  field: FormField;
  noSelect?: boolean;
  parentId: string;
  childIndex: number;
}

function RenderField({ field, noSelect, parentId, childIndex }: RenderFieldProps) {
  const { setSelectedFieldId, clearSelectedFieldId, setActiveTab } = useSettingsStore();
  const selectedFieldId = useSettingsStore((state) => state.selectedFieldId);
  const isSelected = selectedFieldId === field.id;
  const { deleteField } = useSchemaStore();
  const fieldRef = useRef<HTMLDivElement>(null);
  const dragHandlerRef = useRef<HTMLDivElement>(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [operation, setOperation] = useState<Operation>('reorder-after');
  const { handleDrop, canDrop } = useDropField({
    index: childIndex,
    parentId,
    fieldType: field.type,
  });

  const onChange = ({ self, location }: ElementDropTargetEventBasePayload) => {
    const instruction = extractInstruction(self.data);

    if (location.current.dropTargets[0].element !== self.element) {
      setIsDraggedOver(false);
      return;
    }

    invariant(instruction, 'Instruction data should be defined');
    setOperation(instruction.operation);
    setIsDraggedOver(true);
  };

  const handleSelectField = (e: MouseEvent) => {
    e.stopPropagation();
    if (selectedFieldId === field.id) return;
    setSelectedFieldId(field.id);
    setActiveTab(RIGHT_BAR_TABS.FIELD_SETTINGS);
  };

  useEffect(() => {
    const el = fieldRef.current;
    const dragEl = dragHandlerRef.current;

    invariant(el, 'RenderField element is not defined');

    const fn = [
      dropTargetForElements({
        getData: ({ element, input }) => {
          const data = {
            id: field.id,
          };
          return attachInstruction(data, {
            input,
            element,
            operations: {
              'reorder-before': 'available',
              'reorder-after': 'available',
              combine: 'not-available',
            },
          });
        },
        element: el,
        onDragEnter: onChange,
        onDragLeave: () => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setIsDraggedOver(false);
            });
          });
        },
        canDrop,
        onDrag: onChange,
        onDrop: (payload) => {
          setIsDraggedOver(false);
          handleDrop(payload);
        },
      }),
    ];

    if (dragEl) {
      fn.push(
        draggable({
          element: el,
          dragHandle: dragEl,
          getInitialData: () => ({
            action: 'drag',
            type: field.type,
            id: field.id,
          }),
        }),
      );
    }

    // Add any necessary event listeners or logic here
    return combine(...fn);
  }, [field.id, field.type, handleDrop, childIndex, parentId]);

  return (
    <div
      className={cn('relative translate-x-0 bg-primary-50', {
        'z-[100]': isDraggedOver,
      })}
      ref={fieldRef}
    >
      <div
        key={field.id}
        data-field="true"
        id={`field-container-${field.id}`}
        className={cn(
          'transform rounded-md relative h-full outline outline-2 outline-[#00000000] -outline-offset-2 p-1',
          {
            '!outline-primary relative z-50': isSelected,
            '[&:not(:has(div[data-field=true]:hover))]:hover:outline-neutral-100':
              field.type !== FieldType.COLUMN,
            'z-[100]': isDraggedOver,
          },
        )}
        {...(!noSelect && {
          onClick: handleSelectField,
        })}
      >
        {isDraggedOver && (
          <div
            className={cn('absolute z-[999] left-0 right-0 h-1 bg-primary-400 rounded-full ', {
              'top-0 -translate-y-1/2': operation === 'reorder-before',
              'bottom-0 translate-y-1/2': operation === 'reorder-after',
            })}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-400 rounded-full px-3 py-1">
              <p className="typography-body3 text-neutral-50">Drop here</p>
            </div>
          </div>
        )}
        <FieldItem field={field} />
      </div>
      {isSelected && (
        <div className="absolute top-0 left-0 -translate-x-full">
          <div ref={dragHandlerRef} className="bg-primary p-1 text-white cursor-grab">
            <AiOutlineDrag />
          </div>
          <button
            className="bg-danger p-1 text-white"
            onClick={() => {
              deleteField(field.id);
              clearSelectedFieldId();
            }}
          >
            <HiTrash />
          </button>
        </div>
      )}
    </div>
  );
}

interface FieldItemProps {
  field: FormField;
}

function FieldItem({ field }: FieldItemProps) {
  switch (field.type) {
    case FieldType.ROW: {
      return <RowField field={field} />;
    }
    case FieldType.COLUMN: {
      return <ColumnsField field={field} />;
    }
    case FieldType.HEADING: {
      return <HeadingField field={field} />;
    }
    case FieldType.SHORT_TEXT: {
      return <ShortTextField field={field} />;
    }
    case FieldType.LONG_TEXT: {
      return <LongTextField field={field} />;
    }
    case FieldType.NUMBER: {
      return <NumberField field={field} />;
    }
    case FieldType.DIVIDER: {
      return <DividerField field={field} />;
    }
    case FieldType.IMAGE: {
      return <ImageField field={field} />;
    }
    case FieldType.SINGLE_CHOICE: {
      return <SingleChoiceField field={field} />;
    }
    case FieldType.MULTIPLE_CHOICES: {
      return <MultipleChoicesField field={field} />;
    }
    case FieldType.DATE: {
      return <DateField field={field} />;
    }
    case FieldType.TIME: {
      return <TimeField field={field} />;
    }
    case FieldType.DATE_TIME: {
      return <DateTimeField field={field} />;
    }
    case FieldType.FILE: {
      return <FileField field={field} />;
    }
    case FieldType.BUTTON: {
      return <ButtonField field={field} />;
    }
    case FieldType.BLOCK: {
      return <BlockField field={field} />;
    }
    default: {
      throw new Error(`Unknown field type: ${field.type}`);
    }
  }
}

export default RenderField;
