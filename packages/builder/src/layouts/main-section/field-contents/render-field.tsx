import type { FormField } from '@efie-form/core';
import type { MouseEvent } from 'react';
import { useRef } from 'react';
import { RIGHT_BAR_TABS } from '../../../lib/constant';
import useDropField from '../../../lib/hooks/use-drop-field';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { useSettingsStore } from '../../../lib/state/settings.state';
import { cn } from '../../../lib/utils';
import { DropIndicator, FieldActionButtons, FieldContainer, FieldItem } from './components';
import { useDragAndDrop } from './hooks/use-drag-and-drop';

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

  const { handleDrop, canDrop } = useDropField({
    index: childIndex,
    parentId,
    fieldType: field.type,
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

  const handleDeleteField = () => {
    deleteField(field.id);
    clearSelectedFieldId();
  };

  return (
    <div
      className={cn('relative translate-x-0 bg-primary-50', {
        'z-[100]': isDraggedOver,
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
        <FieldActionButtons
          dragHandlerRef={dragHandlerRef}
          onDuplicate={handleDuplicateField}
          onDelete={handleDeleteField}
        />
      )}
    </div>
  );
}

export default RenderField;
