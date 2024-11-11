import React from 'react';
import type { FormField } from '@efie-form/core';
import ShortTextProvider from './FieldProvider/ShortTextProvider';
import type { FieldPropsMap } from '../types/FieldProps';
import LongTextProvider from './FieldProvider/LongTextProvider';

interface RenderFieldProps extends Partial<FieldPropsMap> {
  field: FormField;
}

function RenderField({ field, ...props }: RenderFieldProps) {
  switch (field.type) {
    case 'shortText':
      return <ShortTextProvider field={field} Component={props.shortText} />;
    case 'longText':
      return <LongTextProvider field={field} Component={props.longText} />;
  }
}

export default RenderField;
