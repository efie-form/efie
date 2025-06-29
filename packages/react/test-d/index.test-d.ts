import { expectType } from 'tsd';
import React from 'react';

// Example type tests for your React components
// These will run against whatever version of @types/react is currently installed

// Test that React components can be typed correctly
expectType<React.ComponentType<object>>(React.Fragment);
expectType<React.FC<{ children?: React.ReactNode }>>(
  ({ children }) => React.createElement('div', undefined, children),
);

// Add specific tests for your components here
// For example, if you have a FormField component:
// import { FormField } from '../lib/form-field';
// expectType<React.ComponentType<FormFieldProps>>(FormField);

// Test React 19 specific features (these will fail on React 18)
// Uncomment when testing React 19:
// expectType<React.ComponentType<{ ref?: React.Ref<HTMLDivElement> }>>(
//   React.forwardRef<HTMLDivElement>((props, ref) => <div ref={ref} />)
// );
