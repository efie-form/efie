import type { ElementType } from 'react';
import { createElement } from 'react';
import type { FileFieldProps } from '../../types/field-props';
import { PropertyType, type FileFormField } from '@efie-form/core';

interface FileProviderProps {
  field: FileFormField;
  Component?: ElementType<FileFieldProps>;
  value?: File[] | File | null;
  onChange?: (value: File[] | File | null) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  validation?: FileFieldProps['validation'];
}

function FileProvider({
  field,
  Component,
  value,
  onChange = () => {},
  onBlur,
  onFocus,
  validation,
}: FileProviderProps) {
  if (!Component) return <></>;

  const label = field.props.find(prop => prop.type === PropertyType.LABEL);
  const required = field.props.find(prop => prop.type === PropertyType.REQUIRED);
  const accept = field.props.find(prop => prop.type === PropertyType.ACCEPT);
  const maxFiles = field.props.find(prop => prop.type === PropertyType.MAX_FILES);

  return createElement(Component, {
    id: field.id,
    field,
    value,
    onChange,
    onBlur,
    onFocus,
    validation,
    style: {},
    required: required?.value || false,
    disabled: false,
    // Field-specific props
    fieldLabel: label?.value || '',
    accept: accept?.value?.formats || [],
    multiple: (maxFiles?.value || 1) > 1,
    maxFiles: maxFiles?.value || 1,
  } satisfies FileFieldProps);
}

export default FileProvider;
