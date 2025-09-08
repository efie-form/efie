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
import {
  type CheckboxFormField,
  type EmailFormField,
  FieldType,
  type FormField,
  type PasswordFormField,
  type PhoneFormField,
} from '@efie-form/core';
import { type MouseEvent, useEffect, useRef, useState } from 'react';
import { AiOutlineDrag } from 'react-icons/ai';
import { HiOutlineDocumentDuplicate, HiTrash } from 'react-icons/hi2';
import invariant from 'tiny-invariant';
import { RIGHT_BAR_TABS } from '../../../lib/constant';
import useDropField from '../../../lib/hooks/use-drop-field';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { useSettingsStore } from '../../../lib/state/settings.state';
import { cn } from '../../../lib/utils';
import {
  AddressField,
  BlockField,
  ButtonField,
  CheckboxField,
  DateField,
  DateTimeField,
  DividerField,
  EmailField,
  FileField,
  GroupField,
  HeadingField,
  ImageField,
  LongTextField,
  MultipleChoicesField,
  NumberField,
  PasswordField,
  PhoneField,
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
  const { deleteField, duplicateField } = useSchemaStore();
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

  const handleDuplicateField = (e: MouseEvent) => {
    e.stopPropagation();
    const duplicatedFieldId = duplicateField(field.id);
    if (duplicatedFieldId) {
      // Select the newly duplicated field
      setSelectedFieldId(duplicatedFieldId);
      setActiveTab(RIGHT_BAR_TABS.FIELD_SETTINGS);
    }
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
          '-outline-offset-2 relative h-full transform rounded-md p-1 outline outline-2 outline-[#00000000]',
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
            className={cn('absolute right-0 left-0 z-[999] h-1 rounded-full bg-primary-400 ', {
              '-translate-y-1/2 top-0': operation === 'reorder-before',
              'bottom-0 translate-y-1/2': operation === 'reorder-after',
            })}
          >
            <div className="-translate-x-1/2 -translate-y-1/2 absolute top-0 left-1/2 rounded-full bg-primary-400 px-3 py-1">
              <p className="typography-body3 text-neutral-50">Drop here</p>
            </div>
          </div>
        )}
        <FieldItem field={field} />
      </div>
      {isSelected && (
        <div className="-translate-x-full absolute top-0 left-0 flex flex-col">
          <div ref={dragHandlerRef} className="cursor-grab bg-primary p-1 text-white">
            <AiOutlineDrag />
          </div>
          <button
            type="button"
            className="bg-success p-1 text-white hover:bg-success-600 transition-colors"
            onClick={handleDuplicateField}
            title="Duplicate field"
          >
            <HiOutlineDocumentDuplicate />
          </button>
          <button
            type="button"
            className="bg-danger p-1 text-white hover:bg-danger-600 transition-colors"
            onClick={() => {
              deleteField(field.id);
              clearSelectedFieldId();
            }}
            title="Delete field"
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

function FieldItem({ field }: FieldItemProps): JSX.Element | never {
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
    case FieldType.ADDRESS: {
      return <AddressField field={field} />;
    }
    case FieldType.PASSWORD: {
      return <PasswordField field={field as PasswordFormField} />;
    }
    case FieldType.EMAIL: {
      return <EmailField field={field as EmailFormField} />;
    }
    case FieldType.PHONE: {
      return <PhoneField field={field as PhoneFormField} />;
    }
    case FieldType.CHECKBOX: {
      return <CheckboxField field={field as CheckboxFormField} />;
    }
    case FieldType.GROUP: {
      return <GroupField field={field} />;
    }
    case FieldType.PAGE: {
      return <span>Page</span>;
    }
    default: {
      return field;
    }
  }
}

export default RenderField;
