import type { ElementType } from 'react';
import { createElement } from 'react';
import type { FileFieldProps } from '../../types/FieldProps';
import type { FormFieldFile } from '@efie-form/core';

interface FileProviderProps {
  field: FormFieldFile;
  Component?: ElementType<FileFieldProps>;
}

function FileProvider({ field, Component }: FileProviderProps) {
  if (!Component) return null;

  return createElement(Component, {
    id: field.id,
    value: new File([], ''),
    onChange: () => new File([], ''),
    label: field.props.label,
    required: field.props.required,
    disabled: false,
    accept: field.props.accept,
    multiple: field.props.multiple,
    errors: {
      message: '',
    },
  });
}

export default FileProvider;
