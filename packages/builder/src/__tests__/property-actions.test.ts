import { PropertyType } from '@efie-form/core';
import type { PropertyDefinition } from '@efie-form/core';
import { createTestStore, createPropertyTestSchema } from './test-utils';

describe('Property Actions', () => {
  let useStore: ReturnType<typeof createTestStore>;
  let store: ReturnType<typeof useStore.getState>;

  beforeEach(() => {
    // Create a fresh store for each test with property test schema
    useStore = createTestStore(createPropertyTestSchema());
    store = useStore.getState();
  });

  describe('updateFieldProperty', () => {
    it('should update an existing property', () => {
      const newProperty: PropertyDefinition = {
        type: PropertyType.BACKGROUND_COLOR,
        value: '#FF0000',
      };

      store.updateFieldProperty('block-1', newProperty);

      const updatedProperty = store.getFieldProperty('block-1', PropertyType.BACKGROUND_COLOR);
      expect(updatedProperty?.value).toBe('#FF0000');
    });

    it('should add a new property if it does not exist', () => {
      const newProperty: PropertyDefinition = {
        type: PropertyType.BORDER_WIDTH,
        value: { value: 2, unit: 'px' },
      };

      store.updateFieldProperty('block-1', newProperty);

      const addedProperty = store.getFieldProperty('block-1', PropertyType.BORDER_WIDTH);
      expect(addedProperty?.value).toEqual({ value: 2, unit: 'px' });
    });

    it('should not update property for non-existent field', () => {
      const newProperty: PropertyDefinition = {
        type: PropertyType.COLOR,
        value: '#000000',
      };

      // Should not throw error
      store.updateFieldProperty('non-existent', newProperty);

      // Verify no changes were made
      const field = store.getFieldById('non-existent');
      expect(field).toBeUndefined();
    });
  });

  describe('addFieldProperty', () => {
    it('should add a new property if it does not exist', () => {
      const newProperty: PropertyDefinition = {
        type: PropertyType.BORDER_RADIUS,
        value: {
          topLeft: { value: 4, unit: 'px' },
          topRight: { value: 4, unit: 'px' },
          bottomLeft: { value: 4, unit: 'px' },
          bottomRight: { value: 4, unit: 'px' },
        },
      };

      store.addFieldProperty('block-1', newProperty);

      const addedProperty = store.getFieldProperty('block-1', PropertyType.BORDER_RADIUS);
      expect(addedProperty?.value).toEqual({
        topLeft: { value: 4, unit: 'px' },
        topRight: { value: 4, unit: 'px' },
        bottomLeft: { value: 4, unit: 'px' },
        bottomRight: { value: 4, unit: 'px' },
      });
    });

    it('should not add property if it already exists', () => {
      const existingProperty: PropertyDefinition = {
        type: PropertyType.BACKGROUND_COLOR,
        value: '#FF0000',
      };

      // Get original property value
      const originalProperty = store.getFieldProperty('block-1', PropertyType.BACKGROUND_COLOR);

      store.addFieldProperty('block-1', existingProperty);

      // Should still have original value
      const unchangedProperty = store.getFieldProperty('block-1', PropertyType.BACKGROUND_COLOR);
      expect(unchangedProperty?.value).toBe(originalProperty?.value);
    });
  });

  describe('removeFieldProperty', () => {
    it('should remove an existing property', () => {
      store.removeFieldProperty('block-1', PropertyType.BACKGROUND_COLOR);

      const removedProperty = store.getFieldProperty('block-1', PropertyType.BACKGROUND_COLOR);
      expect(removedProperty).toBeUndefined();
    });

    it('should not error when removing non-existent property', () => {
      // Should not throw error
      store.removeFieldProperty('block-1', PropertyType.BORDER_WIDTH);

      // Other properties should remain
      const colorProperty = store.getFieldProperty('block-1', PropertyType.COLOR);
      expect(colorProperty?.value).toBe('#000000');
    });
  });

  describe('setFieldProperties', () => {
    it('should replace all properties', () => {
      const newProperties: PropertyDefinition[] = [
        {
          type: PropertyType.PADDING,
          value: {
            top: { value: 16, unit: 'px' },
            right: { value: 16, unit: 'px' },
            bottom: { value: 16, unit: 'px' },
            left: { value: 16, unit: 'px' },
          },
        },
        {
          type: PropertyType.MARGIN,
          value: {
            top: { value: 8, unit: 'px' },
            right: { value: 8, unit: 'px' },
            bottom: { value: 8, unit: 'px' },
            left: { value: 8, unit: 'px' },
          },
        },
      ];

      store.setFieldProperties('block-1', newProperties);

      const allProperties = store.getFieldProperties('block-1');
      expect(allProperties).toHaveLength(2);
      expect(allProperties).toEqual(newProperties);

      // Old BG_COLOR property should be gone
      const bgColorProperty = store.getFieldProperty('block-1', PropertyType.BACKGROUND_COLOR);
      expect(bgColorProperty).toBeUndefined();
    });
  });

  describe('getFieldProperty', () => {
    it('should return the correct property', () => {
      const bgColorProperty = store.getFieldProperty('block-1', PropertyType.BACKGROUND_COLOR);
      expect(bgColorProperty?.value).toBe('#FFFFFF');
    });

    it('should return undefined for non-existent property', () => {
      const nonExistentProperty = store.getFieldProperty('block-1', PropertyType.BORDER_RADIUS);
      expect(nonExistentProperty).toBeUndefined();
    });

    it('should return undefined for non-existent field', () => {
      const property = store.getFieldProperty('non-existent', PropertyType.BACKGROUND_COLOR);
      expect(property).toBeUndefined();
    });
  });

  describe('getFieldProperties', () => {
    it('should return all properties for a field', () => {
      const properties = store.getFieldProperties('block-1');
      expect(properties).toHaveLength(2);
      expect(properties.map(p => p.type)).toContain(PropertyType.BACKGROUND_COLOR);
      expect(properties.map(p => p.type)).toContain(PropertyType.COLOR);
    });

    it('should return empty array for non-existent field', () => {
      const properties = store.getFieldProperties('non-existent');
      expect(properties).toEqual([]);
    });
  });
});
