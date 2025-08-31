import { type FileFormField, PropertyType } from '@efie-form/core';
import type { ElementType } from 'react';
import { createElement } from 'react';
import type { FileFieldProps } from '../../types/field-props';

interface FileProviderProps {
  field: FileFormField;
  Component?: ElementType<FileFieldProps>;
  value?: File[] | File;
  onChange?: (value?: File[] | File) => void;
}

function FileProvider({ field, Component, value, onChange = () => {} }: FileProviderProps) {
  if (!Component) return null;

  const label = field.props.find((prop) => prop.type === PropertyType.LABEL);
  const accept = field.props.find((prop) => prop.type === PropertyType.ACCEPT);

  return createElement(Component, {
    id: field.id,
    field,
    fieldLabel: label?.value || '',
    value,
    onChange,
    accept: accept?.value?.formats.join(', ') || '',
  } satisfies FileFieldProps);
}

export default FileProvider;
