import { FormFieldType, type FormField } from '../../../../../core-old';
import ColumnsField from './fields/ColumnsField.tsx';
import RowField from './fields/RowField.tsx';
import {
  RIGHT_BAR_TABS,
  useSettingsStore,
} from '../../../lib/state/settings.state.ts';
import { useState, type MouseEvent } from 'react';
import HeaderField from './fields/HeaderField.tsx';
import ParagraphField from './fields/ParagraphField.tsx';
import ShortTextField from './fields/ShortTextField.tsx';
import LongTextField from './fields/LongTextField.tsx';
import NumberField from './fields/NumberField.tsx';
import DividerField from './fields/DividerField.tsx';
import ImageField from './fields/ImageField.tsx';
import SingleChoiceField from './fields/SingleChoiceField.tsx';
import MultipleChoicesField from './fields/MultipleChoicesField.tsx';
import DateField from './fields/DateField.tsx';
import TimeField from './fields/TimeField.tsx';
import DateTimeField from './fields/DateTimeField.tsx';
import FileField from './fields/FileField.tsx';
import { cn } from '../../../lib/utils.ts';
import ButtonField from './fields/ButtonField.tsx';
import BlockField from './fields/BlockField.tsx';
import { AiOutlineDrag } from 'react-icons/ai';
import { HiTrash } from 'react-icons/hi2';
import useDndItem from '../../../components/dnd-kit/useDndItem.tsx';
import Droppable from '../../../components/dnd-kit/Droppable.tsx';
import { useSchemaStore } from '../../../lib/state/schema.state.ts';
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
    }
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
              field.type !== 'column',
          }
        )}
        {...(!noSelect && {
          onClick: (e: MouseEvent) => {
            e.stopPropagation();
            setSelectedFieldId(field.id);
            setActiveTab(RIGHT_BAR_TABS.FIELD_SETTINGS);
          },
        })}
      >
        {isSelected &&
          createPortal(
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
            document.querySelector('#form-zone')!
          )}
        <FieldItem field={field} />
      </div>
    </Droppable>
  );
}

function FieldItem({ field }: RenderFieldProps) {
  switch (field.type) {
    case FormFieldType.ROW: {
      return <RowField field={field} />;
    }
    case FormFieldType.COLUMN: {
      return <ColumnsField field={field} />;
    }
    case FormFieldType.HEADER: {
      return <HeaderField field={field} />;
    }
    case FormFieldType.PARAGRAPH: {
      return <ParagraphField field={field} />;
    }
    case FormFieldType.SHORT_TEXT: {
      return <ShortTextField field={field} />;
    }
    case FormFieldType.LONG_TEXT: {
      return <LongTextField field={field} />;
    }
    case FormFieldType.NUMBER: {
      return <NumberField field={field} />;
    }
    case FormFieldType.DIVIDER: {
      return <DividerField field={field} />;
    }
    case FormFieldType.IMAGE: {
      return <ImageField field={field} />;
    }
    case FormFieldType.SINGLE_CHOICE: {
      return <SingleChoiceField field={field} />;
    }
    case FormFieldType.MULTIPLE_CHOICES: {
      return <MultipleChoicesField field={field} />;
    }
    case FormFieldType.DATE: {
      return <DateField field={field} />;
    }
    case FormFieldType.TIME: {
      return <TimeField field={field} />;
    }
    case FormFieldType.DATE_TIME: {
      return <DateTimeField field={field} />;
    }
    case FormFieldType.FILE: {
      return <FileField field={field} />;
    }
    case FormFieldType.BUTTON: {
      return <ButtonField field={field} />;
    }
    case FormFieldType.BLOCK: {
      return <BlockField field={field} />;
    }
    default: {
      return (
        <div className="px-4 py-2">
          {field.id} {field.type}
        </div>
      );
    }
  }
}

export default RenderField;
