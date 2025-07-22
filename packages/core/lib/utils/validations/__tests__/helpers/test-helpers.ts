import type { FieldType } from '../../../../constants/field-type';
import { SizeType } from '../../../../constants/form-schema.constant';
import type { FormField } from '../../../../types/form-field.type';
import type { FormSchema } from '../../../../types/form-schema.type';

// Helper function to create a minimal valid schema
export const createValidSchema = (): FormSchema => ({
  version: 'v1',
  form: {
    fields: [],
    rules: [],
  },
});

// Helper function to create a valid field with minimal props
export const createValidField = (type: FieldType, additionalProps: unknown[] = []): FormField =>
  ({
    id: 'test-id',
    type,
    props: [
      {
        type: 'label' as const,
        value: 'Test Label',
      },
      ...additionalProps,
    ],
  }) as FormField;

// Helper function to create valid size value
export const createValidSize = () => ({
  type: SizeType.LENGTH,
  value: 10,
  unit: 'px',
});

// Helper function to create valid color value
export const createValidColor = () => ({
  hex: '#FFFFFF',
});
