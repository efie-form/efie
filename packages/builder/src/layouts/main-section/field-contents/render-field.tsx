import type { MouseEvent } from 'react';
import { useRef } from 'react';
import { RIGHT_BAR_TABS } from '../../../lib/constant';
import useDropField from '../../../lib/hooks/use-drop-field';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { useSettingsStore } from '../../../lib/state/settings.state';
import { cn } from '../../../lib/utils';
import { DropIndicator, FieldActionButtons, FieldContainer, FieldItem } from './components';
import FieldName from './components/field-name';
import { useDragAndDrop } from './hooks/use-drag-and-drop';

interface RenderFieldProps {
  noSelect?: boolean;
  parentId: string;
  childIndex: number;
  fieldId: string;
}

function RenderField({ fieldId, noSelect, parentId, childIndex }: RenderFieldProps) {
  const { setSelectedFieldId, clearSelectedFieldId, setActiveTab } = useSettingsStore();
  const field = useSchemaStore((state) => state.getFieldById(fieldId));
  const selectedFieldId = useSettingsStore((state) => state.selectedFieldId);
  const isSelected = selectedFieldId === field?.id;
  const { deleteField, duplicateField } = useSchemaStore();
  const fieldRef = useRef<HTMLDivElement>(null);
  const dragHandlerRef = useRef<HTMLDivElement>(null);

  const { handleDrop, canDrop } = useDropField({
    index: childIndex,
    parentId,
    fieldType: field?.type,
  });

  const { isDraggedOver, operation } = useDragAndDrop({
    field,
    fieldRef,
    dragHandlerRef,
    handleDrop,
    canDrop,
    childIndex,
    parentId,
  });

  const handleSelectField = (e: MouseEvent) => {
    e.stopPropagation();
    if (!field || selectedFieldId === field.sys.id) return;
    setSelectedFieldId(field.sys.id);
    setActiveTab(RIGHT_BAR_TABS.FIELD_SETTINGS);
  };

  const handleDuplicateField = (e: MouseEvent) => {
    e.stopPropagation();
    if (!field) return;
    const duplicatedFieldId = duplicateField(field.sys.id);
    if (duplicatedFieldId) {
      // Select the newly duplicated field
      setSelectedFieldId(duplicatedFieldId);
      setActiveTab(RIGHT_BAR_TABS.FIELD_SETTINGS);
    }
  };

  const handleDeleteField = () => {
    if (!field) return;
    deleteField(field.sys.id);
    clearSelectedFieldId();
  };

  if (!field) return null;

  return (
    <div
      className={cn('relative translate-x-0 bg-primary-50', {
        'z-[100]': isDraggedOver || isSelected,
      })}
      ref={fieldRef}
    >
      <FieldContainer
        field={field}
        isSelected={isSelected}
        isDraggedOver={isDraggedOver}
        noSelect={noSelect}
        onSelectField={handleSelectField}
      >
        {isDraggedOver && <DropIndicator operation={operation} />}
        <FieldItem field={field} />
      </FieldContainer>

      {isSelected && (
        <>
          <FieldActionButtons
            dragHandlerRef={dragHandlerRef}
            onDuplicate={handleDuplicateField}
            onDelete={handleDeleteField}
          />
          <FieldName field={field} />
        </>
      )}
    </div>
  );
}

export default RenderField;
