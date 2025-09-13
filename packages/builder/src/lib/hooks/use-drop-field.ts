import type {
  ElementDropTargetEventBasePayload,
  ElementDropTargetGetFeedbackArgs,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { extractInstruction } from '@atlaskit/pragmatic-drag-and-drop-hitbox/list-item';
import { FieldType } from '@efie-form/core';
import invariant from 'tiny-invariant';
import { isMoveField, isNewField } from '../field-type-guard';
import { getNextFieldCount } from '../generate-field-name';
import { getDefaultField } from '../get-default-field';
import { useSchemaStore } from '../state/schema.state';

const NO_DROP_FIELD_TYPES: Set<FieldType> = new Set([FieldType.COLUMN]);

interface UseDropFieldProps {
  index: number;
  parentId: string;
  fieldType?: FieldType;
}

export default function useDropField({ index, parentId, fieldType }: UseDropFieldProps) {
  const { addField, moveField, listChildrenId, schema } = useSchemaStore();

  const handleAddField = ({ self, source }: ElementDropTargetEventBasePayload) => {
    const instruction = extractInstruction(self.data);

    invariant(isNewField(source.data), 'Source data should be a new field');

    const targetIndex =
      instruction?.operation === 'reorder-before'
        ? index
        : instruction?.operation === 'reorder-after'
          ? index + 1
          : 0;

    const newField = getDefaultField({
      type: source.data.type,
      formName: source.data.formKey,
      nextFieldCount: getNextFieldCount(schema),
    });

    addField(newField, parentId, targetIndex);
  };

  const handleMoveField = ({ self, source }: ElementDropTargetEventBasePayload) => {
    const instruction = extractInstruction(self.data);

    invariant(isMoveField(source.data), 'Source data should be an existing field');

    const targetIndex =
      instruction?.operation === 'reorder-before'
        ? index
        : instruction?.operation === 'reorder-after'
          ? index + 1
          : 0;

    moveField(source.data.id, parentId, targetIndex);
  };

  const handleDrop = (payload: ElementDropTargetEventBasePayload) => {
    const { source, location, self } = payload;

    if (location.current.dropTargets[0].element !== self.element) {
      // If it is dropped in the children of the field, do not handle the drop
      return;
    }

    if (isNewField(source.data)) {
      handleAddField(payload);
    } else if (isMoveField(source.data)) {
      handleMoveField(payload);
    } else {
      console.warn('Unsupported field type for drop operation');
    }
  };

  const canDrop = ({ source }: ElementDropTargetGetFeedbackArgs) => {
    if (isMoveField(source.data)) {
      const childrenId = listChildrenId(source.data.id);
      if (childrenId.includes(parentId) || source.data.id === parentId) {
        return false;
      }
    }
    if (fieldType && NO_DROP_FIELD_TYPES.has(fieldType)) return false;
    return true;
  };

  return {
    handleAddField,
    handleMoveField,
    handleDrop,
    canDrop,
  };
}
