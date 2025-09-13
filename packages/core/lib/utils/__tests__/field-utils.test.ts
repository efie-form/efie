import { PropertyType } from '../../property-type';
import type { ShortTextFormField } from '../../types/form-field.type';
import { isFieldHidden, isFieldRequired } from '../field-utils';

describe('Field Utils', () => {
  const createTestField = (hidden = false, required = false): ShortTextFormField => ({
    id: 'test-field',
    type: 'short_text',
    sys: {
      name: 'test-field',
    },
    form: {
      name: 'test-name',
    },
    props: [
      ...(hidden
        ? [
            {
              type: PropertyType.HIDDEN,
              value: true,
            },
          ]
        : []),
      ...(required
        ? [
            {
              type: PropertyType.REQUIRED,
              value: true,
            },
          ]
        : []),
    ],
  });

  describe('isFieldHidden', () => {
    it('should return true when field has hidden property set to true', () => {
      const field = createTestField(true, false);
      expect(isFieldHidden(field)).toBe(true);
    });

    it('should return false when field has no hidden property', () => {
      const field = createTestField(false, false);
      expect(isFieldHidden(field)).toBe(false);
    });

    it('should return false when field has hidden property set to false', () => {
      const field: ShortTextFormField = {
        id: 'test-field',
        type: 'short_text',
        sys: {
          name: 'test-field',
        },
        form: {
          name: 'test-name',
        },
        props: [
          {
            type: PropertyType.HIDDEN,
            value: false,
          },
        ],
      };
      expect(isFieldHidden(field)).toBe(false);
    });
  });

  describe('isFieldRequired', () => {
    it('should return true when field has required property set to true', () => {
      const field = createTestField(false, true);
      expect(isFieldRequired(field)).toBe(true);
    });

    it('should return false when field has no required property', () => {
      const field = createTestField(false, false);
      expect(isFieldRequired(field)).toBe(false);
    });

    it('should return false when field has required property set to false', () => {
      const field: ShortTextFormField = {
        id: 'test-field',
        type: 'short_text',
        sys: {
          name: 'test-field',
        },
        form: {
          name: 'test-name',
        },
        props: [
          {
            type: PropertyType.REQUIRED,
            value: false,
          },
        ],
      };
      expect(isFieldRequired(field)).toBe(false);
    });
  });
});
