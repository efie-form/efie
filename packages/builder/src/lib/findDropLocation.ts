import type { FormField } from '@efie-form/core';

import { FormFieldType } from '@efie-form/core';

interface findDropLocation {
  dropFieldId: string;
  dropFieldType: FormFieldType;
  direction: 'up' | 'down';
  newFieldType: FormFieldType;
  schema: { form: { fields: FormField[] } };
  fieldMap: Map<string, FormField>;
  fieldParentMap: Map<string, string>;
}

// Helper function to find drop location for addField
const findDropLocation = ({ dropFieldId, dropFieldType, direction, newFieldType, schema, fieldMap, fieldParentMap }: findDropLocation) => {
  if (isDropOnChildren(newFieldType, dropFieldType)) {
    // Drop as child - add to the end of children
    return { parentId: dropFieldId, index: undefined };
  }
  else {
    // Drop as sibling - find parent and calculate index
    const dropField = fieldMap.get(dropFieldId);
    if (!dropField) return { parentId: undefined, index: undefined };

    const parentId = fieldParentMap.get(dropFieldId);
    if (parentId) {
      // Has parent - find index in parent's children
      const parent = fieldMap.get(parentId);
      if (!parent || !('children' in parent)) return { parentId: undefined, index: undefined };

      const siblingIndex = parent.children.findIndex((f: FormField) => f.id === dropFieldId);
      if (siblingIndex === -1) return { parentId: undefined, index: undefined };

      return {
        parentId,
        index: direction === 'up' ? siblingIndex : siblingIndex + 1,
      };
    }
    else {
      // Root level - find index in root fields
      const rootIndex = schema.form.fields.findIndex((f: FormField) => f.id === dropFieldId);
      if (rootIndex === -1) return { parentId: undefined, index: undefined };

      return {
        parentId: undefined,
        index: direction === 'up' ? rootIndex : rootIndex + 1,
      };
    }
  }
};

// Helper function to determine if field should be dropped as child
const isDropOnChildren = (newType: FormFieldType, dropType: FormFieldType) => {
  if (newType !== FormFieldType.BLOCK && dropType === FormFieldType.BLOCK) return true;
  if (dropType === FormFieldType.COLUMN || dropType === FormFieldType.PAGE) return true;
  return false;
};

export default findDropLocation;
