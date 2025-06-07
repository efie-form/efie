import { FormFieldType, PropertyType } from '@efie-form/core';
import type { FormField } from '@efie-form/core';
import { createTestStore, createComplexTestSchema } from './test-utils';

describe('Field Actions', () => {
  let useStore: ReturnType<typeof createTestStore>;
  let store: ReturnType<typeof useStore.getState>;

  beforeEach(() => {
    // Create a fresh store for each test with complex test schema
    useStore = createTestStore(createComplexTestSchema());
    store = useStore.getState();
  });

  describe('addField', () => {
    it('should add field to specific parent at specific index', () => {
      const newField: FormField = {
        id: 'temp-id',
        type: FormFieldType.LONG_TEXT,
        form: {
          key: 'new-long-text',
        },
        props: [
          {
            type: PropertyType.LABEL,
            value: 'New Long Text',
          },
        ],
      };

      store.addField(newField, 'block-1', 0);

      const blockField = store.getFieldById('block-1');
      expect('children' in blockField! && blockField.children).toHaveLength(2);

      // Should be inserted at index 0
      const firstChild = 'children' in blockField! ? blockField.children[0] : undefined;
      expect(firstChild?.type).toBe(FormFieldType.LONG_TEXT);
    });

    it('should add field to end if no index specified', () => {
      const newField: FormField = {
        id: 'temp-id',
        type: FormFieldType.NUMBER,
        form: {
          key: 'new-number',
        },
        props: [],
      };

      store.addField(newField, 'block-1');

      const blockField = store.getFieldById('block-1');
      expect('children' in blockField! && blockField.children).toHaveLength(2);

      // Should be added at the end
      const lastChild = 'children' in blockField! ? blockField.children[1] : undefined;
      expect(lastChild?.type).toBe(FormFieldType.NUMBER);
    });

    it('should generate unique ID for new field', () => {
      const newField: FormField = {
        id: 'temp-id',
        type: FormFieldType.SHORT_TEXT,
        form: {
          key: 'new-short-text',
        },
        props: [],
      };

      store.addField(newField, 'block-1');

      const blockField = store.getFieldById('block-1');
      const addedField = 'children' in blockField! ? blockField.children[1] : undefined;

      expect(addedField?.id).not.toBe('temp-id');
      expect(addedField?.id).toBeDefined();
      expect(typeof addedField?.id).toBe('string');
    });
  });

  describe('moveField', () => {
    it('should move field between different parents', () => {
      // Move field-1 from block-1 to block-2
      store.moveField('field-1', 'block-2', 0);

      // Check that field-1 is no longer in block-1
      const block1 = store.getFieldById('block-1');
      expect('children' in block1! && block1.children).toHaveLength(0);

      // Check that field-1 is now in block-2
      const block2 = store.getFieldById('block-2');
      expect('children' in block2! && block2.children).toHaveLength(1);
      expect('children' in block2! ? block2.children[0].id : undefined).toBe('field-1');

      // Check parent mapping is updated
      const parentId = store.getFieldParentId('field-1');
      expect(parentId).toBe('block-2');
    });

    it('should move field within same parent to different index', () => {
      // First add another field to block-1
      const newField: FormField = {
        id: 'temp-id',
        type: FormFieldType.LONG_TEXT,
        form: {
          key: 'new-long-text-2',
        },
        props: [],
      };

      store.addField(newField, 'block-1');

      const blockBefore = store.getFieldById('block-1');
      const addedFieldId = 'children' in blockBefore! ? blockBefore.children[1].id : undefined;

      // Move the new field to index 0
      store.moveField(addedFieldId!, 'block-1', 0);

      const blockAfter = store.getFieldById('block-1');
      expect('children' in blockAfter! && blockAfter.children).toHaveLength(2);
      expect('children' in blockAfter! ? blockAfter.children[0].id : undefined).toBe(addedFieldId);
      expect('children' in blockAfter! ? blockAfter.children[1].id : undefined).toBe('field-1');
    });

    it('should not error when moving non-existent field', () => {
      // Should not throw error
      expect(() => {
        store.moveField('non-existent', 'block-2', 0);
      }).not.toThrow();
    });
  });

  describe('duplicateField', () => {
    it('should duplicate field with all properties', () => {
      const duplicated = store.duplicateField('field-1');

      expect(duplicated).toBeDefined();
      expect(duplicated?.id).not.toBe('field-1');
      expect(duplicated?.type).toBe(FormFieldType.SHORT_TEXT);
      expect(duplicated?.props).toEqual([
        {
          type: PropertyType.NAME,
          value: 'Text Field 1',
        },
      ]);
    });

    it('should duplicate field with children recursively', () => {
      const duplicated = store.duplicateField('block-1');

      expect(duplicated).toBeDefined();
      expect(duplicated?.id).not.toBe('block-1');
      expect(duplicated?.type).toBe(FormFieldType.BLOCK);

      // Check children are duplicated with new IDs
      if ('children' in duplicated! && duplicated.children) {
        expect(duplicated.children).toHaveLength(1);
        expect(duplicated.children[0].id).not.toBe('field-1');
        expect(duplicated.children[0].type).toBe(FormFieldType.SHORT_TEXT);
      }
    });

    it('should return undefined for non-existent field', () => {
      const duplicated = store.duplicateField('non-existent');
      expect(duplicated).toBeUndefined();
    });
  });

  describe('updateField', () => {
    it('should update field properties', () => {
      const updates = {
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Updated Field Name',
          },
          {
            type: PropertyType.PLACEHOLDER,
            value: 'Enter text here',
          },
        ],
      };

      store.updateField('field-1', updates);

      const updatedField = store.getFieldById('field-1');
      expect(updatedField?.props).toEqual(updates.props);
    });

    it('should not error when updating non-existent field', () => {
      const updates = {
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Updated Name',
          },
        ],
      };

      // Should not throw error
      expect(() => {
        store.updateField('non-existent', updates);
      }).not.toThrow();
    });
  });

  describe('deleteField', () => {
    it('should delete field and update parent', () => {
      store.deleteField('field-1');

      // Field should no longer exist
      const deletedField = store.getFieldById('field-1');
      expect(deletedField).toBeUndefined();

      // Parent should no longer have the child
      const parentBlock = store.getFieldById('block-1');
      expect('children' in parentBlock! && parentBlock.children).toHaveLength(0);

      // Field maps should be updated
      expect(store.fieldMap.has('field-1')).toBe(false);
      expect(store.fieldParentMap.has('field-1')).toBe(false);
    });

    it('should delete field with children recursively', () => {
      store.deleteField('block-1');

      // Block and its children should be deleted
      expect(store.getFieldById('block-1')).toBeUndefined();
      expect(store.getFieldById('field-1')).toBeUndefined();

      // Page should only have block-2 now
      const page = store.getFieldById('page-1');
      expect('children' in page! && page.children).toHaveLength(1);
      expect('children' in page! ? page.children[0].id : undefined).toBe('block-2');
    });
  });
});
