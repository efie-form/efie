import { extractInstruction } from '@atlaskit/pragmatic-drag-and-drop-hitbox/list-item';
import type { ElementDropTargetEventBasePayload } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { isMoveField, isNewField } from '../field-type-guard';
import invariant from 'tiny-invariant';
import { getDefaultField } from '../get-default-field';
import { useSchemaStore } from '../state/schema.state';

interface UseDropFieldProps {
  index: number;
  parentId: string;
}

export default function useDropField({
  index,
  parentId,
}: UseDropFieldProps) {
  const { addField, moveField } = useSchemaStore();

  const handleAddField = ({
    self,
    source,
  }: ElementDropTargetEventBasePayload) => {
    const instruction = extractInstruction(self.data);

    invariant(isNewField(source.data), 'Source data should be a new field');

    const targetIndex = instruction?.operation === 'reorder-before'
      ? index
      : (instruction?.operation === 'reorder-after' ? index + 1 : 0);

    const newField = getDefaultField({
      type: source.data.type,
      formKey: source.data.formKey,
    });

    addField(newField, parentId, targetIndex);
  };

  const handleMoveField = ({ self, source }: ElementDropTargetEventBasePayload) => {
    const instruction = extractInstruction(self.data);

    invariant(instruction, 'Instruction data should be defined');
    invariant(isMoveField(source.data), 'Source data should be an existing field');

    const targetIndex = instruction.operation === 'reorder-before'
      ? index
      : (instruction.operation === 'reorder-after' ? index + 1 : 0);

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
    }
    else if (isMoveField(source.data)) {
      handleMoveField(payload);
    }
    else {
      console.warn('Unsupported field type for drop operation');
    }
  };

  return {
    handleAddField,
    handleMoveField,
    handleDrop,
  };
}
