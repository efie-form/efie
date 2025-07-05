import type { ElementType } from 'react';
import { createElement } from 'react';
import type { FileFieldProps } from '../../types/field-props';
import { PropertyType, type FileFormField } from '@efie-form/core';

interface FileProviderProps {
  field: FileFormField;
  Component?: ElementType<FileFieldProps>;
  value?: File[] | File;
  onChange?: (value?: File[] | File) => void;
}

function FileProvider({
  field,
  Component,
  value,
  onChange = () => {},
}: FileProviderProps) {
  if (!Component) return <></>;

  const label = field.props.find(prop => prop.type === PropertyType.LABEL);
  const accept = field.props.find(prop => prop.type === PropertyType.ACCEPT);
  const maxFiles = field.props.find(prop => prop.type === PropertyType.MAX_FILES);

  return createElement(Component, {
    id: field.id,
    field,
    fieldLabel: label?.value || '',
    value,
    onChange,
    accept: accept?.value?.formats.join(', ') || '',
    multiple: (maxFiles?.value || 1) > 1,
    maxFiles: maxFiles?.value || 1,
  } satisfies FileFieldProps);
}

export default FileProvider;
