import React from 'react';
import { expectType } from 'tsd';
import { FieldType, FormBuilder, FormProvider, ReactForm } from '../dist/index';

// Test that exports are properly typed components/functions
expectType<typeof FormProvider>(FormProvider);
expectType<typeof ReactForm>(ReactForm);
expectType<typeof FormBuilder>(FormBuilder);

// Test enum values exist and are correctly typed
expectType<'short_text'>(FieldType.SHORT_TEXT);
expectType<'long_text'>(FieldType.LONG_TEXT);
expectType<'number'>(FieldType.NUMBER);

// Test basic functional component
const TestComponent: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return React.createElement('div', undefined, children);
};
expectType<React.FC<{ children?: React.ReactNode }>>(TestComponent);

// Add specific tests for your components here
// For example, if you have a FormField component:
// import { FormField } from '../lib/form-field';
// expectType<React.ComponentType<FormFieldProps>>(FormField);

// Test React 19 specific features (these will fail on React 18)
// Uncomment when testing React 19:
// expectType<React.ComponentType<{ ref?: React.Ref<HTMLDivElement> }>>(
//   React.forwardRef<HTMLDivElement>((props, ref) => <div ref={ref} />)
// );
