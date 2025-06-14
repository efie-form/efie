import { getColorObject, PropertyType, SizeType } from '@efie-form/core';
import type { PropertyDefinition, Size } from '@efie-form/core';
import { createTestStore, createPropertyTestSchema } from './test-utils';

// Helper function to create Color objects from hex strings
const createColor = (hex: string) => getColorObject(hex);

// Helper function to create Size objects
const createSize = (value: number, unit: string): Size => ({
  type: SizeType.LENGTH,
  value,
  unit: unit as 'px' | 'em' | 'rem' | '%' | 'vh' | 'vw',
});

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
        value: createColor('#FF0000'),
      };

      store.updateFieldProperty('block-1', newProperty);

      const updatedProperty = store.getFieldProperty('block-1', PropertyType.BACKGROUND_COLOR);
      expect(updatedProperty?.value).toEqual(createColor('#FF0000'));
    });

    it('should add a new property if it does not exist', () => {
      const newProperty: PropertyDefinition = {
        type: PropertyType.FONT_SIZE,
        value: createSize(2, 'px'),
      };

      store.updateFieldProperty('block-1', newProperty);

      const addedProperty = store.getFieldProperty('block-1', PropertyType.FONT_SIZE);
      expect(addedProperty?.value).toEqual({ value: 2, unit: 'px' });
    });

    it('should not update property for non-existent field', () => {
      const newProperty: PropertyDefinition = {
        type: PropertyType.COLOR,
        value: getColorObject('#000000'),
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
          topLeft: { type: SizeType.LENGTH, value: 4, unit: 'px' },
          topRight: { type: SizeType.LENGTH, value: 4, unit: 'px' },
          bottomLeft: { type: SizeType.LENGTH, value: 4, unit: 'px' },
          bottomRight: { type: SizeType.LENGTH, value: 4, unit: 'px' },
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
        value: getColorObject('#FF0000'),
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
      store.removeFieldProperty('block-1', PropertyType.BORDER_RADIUS);

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
            top: { type: SizeType.LENGTH, value: 16, unit: 'px' },
            right: { type: SizeType.LENGTH, value: 16, unit: 'px' },
            bottom: { type: SizeType.LENGTH, value: 16, unit: 'px' },
            left: { type: SizeType.LENGTH, value: 16, unit: 'px' },
          },
        },
        {
          type: PropertyType.MARGIN,
          value: {
            top: { type: SizeType.LENGTH, value: 8, unit: 'px' },
            right: { type: SizeType.LENGTH, value: 8, unit: 'px' },
            bottom: { type: SizeType.LENGTH, value: 8, unit: 'px' },
            left: { type: SizeType.LENGTH, value: 8, unit: 'px' },
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
