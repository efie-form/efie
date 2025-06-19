import type { ElementType } from 'react';
import { createElement } from 'react';
import type { FileFieldProps } from '../../types/field-props';
import { PropertyType, type FileFormField } from '@efie-form/core';

interface FileProviderProps {
  field: FileFormField;
  Component?: ElementType<FileFieldProps>;
}

function FileProvider({ field, Component }: FileProviderProps) {
  if (!Component) return <></>;

  const label = field.props.find(prop => prop.type === PropertyType.LABEL);
  const required = field.props.find(prop => prop.type === PropertyType.REQUIRED);
  const accept = field.props.find(prop => prop.type === PropertyType.ACCEPT);
  const maxFiles = field.props.find(prop => prop.type === PropertyType.MAX_FILES);

  return createElement(Component, {
    id: field.id,
    name: field.form.key || field.id,
    fieldLabel: label?.value || '',
    required: required?.value || false,
    disabled: false,
    accept: accept?.formats?.join(',') || '',
    multiple: (maxFiles?.value || 1) > 1,
    errors: {
      message: '',
    },
  });
}

export default FileProvider;
