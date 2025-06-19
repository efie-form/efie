import { FieldType, PropertyType, getColorObject } from '@efie-form/core';
import type { FormField } from '@efie-form/core';
import { createTestStore } from './test-utils';

// Helper function to create Color objects from hex strings
const createColor = (hex: string) => getColorObject(hex);

describe('Schema State Store', () => {
  let useStore: ReturnType<typeof createTestStore>;
  let store: ReturnType<typeof useStore.getState>;

  beforeEach(() => {
    // Create a fresh store for each test
    useStore = createTestStore();
    store = useStore.getState();
  });

  describe('Initial State', () => {
    it('should initialize with default schema', () => {
      expect(store.schema).toBeDefined();
      expect(store.schema.version).toBe('v1');
      expect(store.schema.form.fields).toHaveLength(1);
    });

    it('should initialize field maps correctly', () => {
      expect(store.fieldMap).toBeInstanceOf(Map);
      expect(store.fieldKeyMap).toBeInstanceOf(Map);
      expect(store.fieldParentMap).toBeInstanceOf(Map);

      // Check that maps contain expected fields
      expect(store.fieldMap.has('page-1')).toBe(true);
      expect(store.fieldMap.has('block-1')).toBe(true);
    });

    it('should initialize history correctly', () => {
      expect(store.histories).toHaveLength(1);
      expect(store.currentHistoryIndex).toBe(0);
      expect(store.totalHistories).toBe(1);
    });
  });

  describe('Field Access Methods', () => {
    it('should get field by id', () => {
      const field = store.getFieldById('block-1');
      expect(field).toBeDefined();
      expect(field?.type).toBe(FieldType.BLOCK);
    });

    it('should return undefined for non-existent field', () => {
      const field = store.getFieldById('non-existent');
      expect(field).toBeUndefined();
    });

    it('should get field parent id', () => {
      const parentId = store.getFieldParentId('block-1');
      expect(parentId).toBe('page-1');
    });

    it('should return undefined for field with no parent', () => {
      const parentId = store.getFieldParentId('page-1');
      expect(parentId).toBeUndefined();
    });
  });

  describe('Field Management', () => {
    it('should add a new field', () => {
      const newField: FormField = {
        id: 'temp-id', // This will be replaced
        type: FieldType.SHORT_TEXT,
        form: {
          key: 'new-field',
        },
        props: [
          {
            type: PropertyType.LABEL,
            value: 'New Field',
          },
        ],
      };

      store.addField(newField, 'block-1');

      // Check that field was added
      const blockField = store.getFieldById('block-1');
      expect(blockField).toBeDefined();
      expect('children' in blockField! && blockField.children).toHaveLength(1);

      // Check that the new field has a different ID
      const addedField = 'children' in blockField! ? blockField.children[0] : undefined;
      expect(addedField?.id).not.toBe('temp-id');
      expect(addedField?.type).toBe(FieldType.SHORT_TEXT);
    });

    it('should update an existing field', () => {
      const updates = {
        props: [
          {
            type: PropertyType.BACKGROUND_COLOR,
            value: createColor('#FF0000'),
          },
        ],
      };

      store.updateField('block-1', updates);

      const updatedField = store.getFieldById('block-1');
      expect(updatedField?.props).toEqual(updates.props);
    });

    it('should duplicate a field with new ID', () => {
      const duplicatedField = store.duplicateField('block-1');

      expect(duplicatedField).toBeDefined();
      expect(duplicatedField?.id).not.toBe('block-1');
      expect(duplicatedField?.type).toBe(FieldType.BLOCK);
      expect(duplicatedField?.props).toEqual([
        {
          type: PropertyType.BACKGROUND_COLOR,
          value: createColor('#FFFFFF'),
        },
      ]);
    });

    it('should delete a field', () => {
      // First add a field to delete
      const newField: FormField = {
        id: 'temp-id',
        type: FieldType.SHORT_TEXT,
        form: {
          key: 'test-field',
        },
        props: [],
      };

      store.addField(newField, 'block-1');

      // Get the actual ID of the added field
      const blockField = store.getFieldById('block-1');
      const childrenCount = 'children' in blockField! ? blockField.children.length : 0;
      const addedFieldId = 'children' in blockField! ? blockField.children[childrenCount - 1]?.id : undefined;

      expect(addedFieldId).toBeDefined();

      // Delete the field
      store.deleteField(addedFieldId!);

      // Verify it's deleted
      const deletedField = store.getFieldById(addedFieldId!);
      expect(deletedField).toBeUndefined();

      // Verify parent no longer has the child
      const updatedBlockField = store.getFieldById('block-1');
      expect('children' in updatedBlockField! && updatedBlockField.children).toHaveLength(0);
    });
  });
});
