import { type FormField, FieldType } from '@efie-form/core';
import ColumnsField from './fields/ColumnsField';
import RowField from './fields/RowField';
import {
  RIGHT_BAR_TABS,
  useSettingsStore,
} from '../../../lib/state/settings.state';
import { type MouseEvent, useState } from 'react';
import HeaderField from './fields/HeaderField';
import ParagraphField from './fields/ParagraphField';
import ShortTextField from './fields/ShortTextField';
import LongTextField from './fields/LongTextField';
import NumberField from './fields/NumberField';
import DividerField from './fields/DividerField';
import ImageField from './fields/ImageField';
import SingleChoiceField from './fields/SingleChoiceField';
import MultipleChoicesField from './fields/MultipleChoicesField';
import DateField from './fields/DateField';
import TimeField from './fields/TimeField';
import DateTimeField from './fields/DateTimeField';
import FileField from './fields/FileField';
import { cn } from '../../../lib/utils';
import ButtonField from './fields/ButtonField';
import BlockField from './fields/BlockField';
import { AiOutlineDrag } from 'react-icons/ai';
import { HiTrash } from 'react-icons/hi2';
import useDndItem from '../../../components/dnd-kit/useDndItem';
import Droppable from '../../../components/dnd-kit/Droppable';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { usePopper } from 'react-popper';
import { createPortal } from 'react-dom';

interface RenderFieldProps {
  field: FormField;
  noSelect?: boolean;
}

function RenderField({ field, noSelect }: RenderFieldProps) {
  const {
    setSelectedFieldId,
    selectedFieldId,
    clearSelectedFieldId,
    setActiveTab,
  } = useSettingsStore();
  const isSelected = selectedFieldId === field.id;
  const { deleteField } = useSchemaStore();
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

  const { attributes, dragHandlerProps } = useDndItem({
    id: field.id,
    type: field.type,
  });

  return (
    <Droppable id={field.id} type={field.type} className="h-full">
      <div
        key={field.id}
        data-field="true"
        id={`field-container-${field.id}`}
        {...attributes}
        ref={(ref) => {
          if (!ref) return;
          setReferenceElement(ref);
          attributes.ref(ref);
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
                {...dragHandlerProps}
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
    </Droppable>
  );
}

function FieldItem({ field }: RenderFieldProps) {
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
