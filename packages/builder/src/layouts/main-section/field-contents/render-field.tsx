import { type FormField, FieldType } from '@efie-form/core';
import ColumnsField from './fields/column-field';
import RowField from './fields/row-field';
import {
  RIGHT_BAR_TABS,
  useSettingsStore,
} from '../../../lib/state/settings.state';
import { type MouseEvent, useEffect, useRef, useState } from 'react';
import HeaderField from './fields/header-field';
import ParagraphField from './fields/paragraph-field';
import ShortTextField from './fields/short-text-field';
import LongTextField from './fields/long-text-field';
import NumberField from './fields/number-field';
import DividerField from './fields/divider-field';
import ImageField from './fields/image-field';
import SingleChoiceField from './fields/single-choice-field';
import MultipleChoicesField from './fields/multiple-choices-field';
import DateField from './fields/date-field';
import TimeField from './fields/time-field';
import DateTimeField from './fields/date-time-field';
import FileField from './fields/file-field';
import { cn } from '../../../lib/utils';
import ButtonField from './fields/button-field';
import BlockField from './fields/block-field';
import { AiOutlineDrag } from 'react-icons/ai';
import { HiTrash } from 'react-icons/hi2';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { usePopper } from 'react-popper';
import { createPortal } from 'react-dom';
import { dropTargetForElements, type ElementDropTargetEventBasePayload } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { attachInstruction, extractInstruction } from '@atlaskit/pragmatic-drag-and-drop-hitbox/list-item';
import { getDefaultField } from '../../../lib/get-default-field';
import isNewField from '../../../lib/is-new-field';
import invariant from 'tiny-invariant';

interface RenderFieldProps {
  field: FormField;
  noSelect?: boolean;
  parentId: string;
  childIndex: number;
}

function RenderField({ field, noSelect, parentId, childIndex }: RenderFieldProps) {
  const {
    setSelectedFieldId,
    selectedFieldId,
    clearSelectedFieldId,
    setActiveTab,
  } = useSettingsStore();
  const isSelected = selectedFieldId === field.id;
  const { deleteField, addField } = useSchemaStore();
  const [referenceElement, setReferenceElement] = useState<
    HTMLDivElement | undefined
  >();
  const [popperElement, setPopperElement] = useState<
    HTMLDivElement | undefined
  >();
  const { styles, attributes: popperAttributes } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: 'left-start',
    },
  );
  const fieldRef = useRef<HTMLDivElement>(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [operation, setOperation] = useState<'reorder-before' | 'reorder-after' | 'combine'>('reorder-before');

  const handleAddField = ({ self, source }: ElementDropTargetEventBasePayload) => {
    const instruction = extractInstruction(self.data);

    invariant(isNewField(source.data), 'Source data should be a new field');

    const index = instruction?.operation === 'reorder-before'
      ? childIndex
      : (instruction?.operation === 'reorder-after' ? childIndex + 1 : 0);

    const newField = getDefaultField({
      type: source.data.type,
      formKey: source.data.formKey,
    });

    addField(newField, parentId, index);
  };

  const onChange = ({ self }: ElementDropTargetEventBasePayload) => {
    const instruction = extractInstruction(self.data);
    invariant(instruction, 'Instruction data should be defined');
    setOperation(instruction.operation);
    setIsDraggedOver(true);
  };

  useEffect(() => {
    const el = fieldRef.current;

    if (!el) return;

    // Add any necessary event listeners or logic here
    return combine(
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
              'combine': 'not-available',
            },
          });
        },
        element: el,
        onDragEnter: onChange,
        onDragLeave: () => {
          setIsDraggedOver(false);
        },
        onDrag: onChange,
        onDrop: (payload) => {
          const { source } = payload;
          setIsDraggedOver(false);
          if (source.data.action === 'new') {
            handleAddField(payload);
          }
        },
      }),
    );
  }, [childIndex]);

  return (
    <>
      <div
        key={field.id}
        data-field="true"
        id={`field-container-${field.id}`}
        ref={(ref) => {
          if (!ref) return;
          // @ts-expect-error assigning ref to fieldRef
          fieldRef.current = ref;
          setReferenceElement(ref);
        }}
        className={cn(
          'transform rounded-md relative h-full outline outline-2 outline-[#00000000] -outline-offset-2',
          {
            '!outline-primary relative z-50': isSelected,
            '[&:not(:has(div[data-field=true]:hover))]:hover:outline-neutral-100':
              field.type !== FieldType.COLUMN,
          },
        )}
        {...(!noSelect && {
          onClick: (e: MouseEvent) => {
            e.stopPropagation();
            setSelectedFieldId(field.id);
            setActiveTab(RIGHT_BAR_TABS.FIELD_SETTINGS);
          },
        })}
      >
        {isDraggedOver && (
          <div className={cn('absolute left-0 right-0 h-1 bg-primary ', {
            'top-0 -translate-y-1/2': operation === 'reorder-before',
            'bottom-0 translate-y-1/2': operation === 'reorder-after',
          })}
          />
        )}
        {isSelected && (() => {
          const formZone = document.querySelector('#form-zone');
          if (!formZone) return;

          return createPortal(
            <div
              ref={(el) => {
                if (!el) return;
                setPopperElement(el);
              }}
              style={styles.popper}
              {...popperAttributes.popper}
            >
              <div
                className="bg-primary p-1 text-white cursor-grab"
              >
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
            </div>,
            formZone,
          );
        })()}
        <FieldItem field={field} />
      </div>
    </>
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
    case FieldType.HEADER: {
      return <HeaderField field={field} />;
    }
    case FieldType.PARAGRAPH: {
      return <ParagraphField field={field} />;
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
