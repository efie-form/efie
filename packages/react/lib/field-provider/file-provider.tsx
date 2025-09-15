import { type FileFormField, PropertyType } from '@efie-form/core';
import type { ElementType } from 'react';
import { createElement } from 'react';
import type { FileFieldProps } from '../../types/field-props';
import { useConditionContext } from '../components/condition-provider';
import { useFieldCondition } from '../hooks/use-field-condition';

interface FileProviderProps {
  field: FileFormField;
  Component?: ElementType<FileFieldProps>;
  value?: File[] | File;
  onChange?: (value?: File[] | File) => void;
}

function FileProvider({ field, Component, value, onChange = () => {} }: FileProviderProps) {
  const { isVisible, isRequired, isHidden } = useFieldCondition(field.sys.id);
  const { processFormChange } = useConditionContext();

  if (!Component) return null;

  // Check if field should be visible
  if (!isVisible) {
    return null;
  }

  const label = field.props.find(
    (prop): prop is { type: typeof PropertyType.LABEL; value: string } =>
      prop.type === PropertyType.LABEL,
  );
  const accept = field.props.find(
    (
      prop,
    ): prop is {
      type: typeof PropertyType.ACCEPT;
      value: { formats: string[]; allowAll: boolean };
    } => prop.type === PropertyType.ACCEPT,
  );

  const conditionAwareOnChange = (value?: File[] | File) => {
    onChange(value);
    // Process conditions with serializable value (file names/count)
    let serializableValue: string | number | null = null;
    if (value) {
      if (Array.isArray(value)) {
        serializableValue = value.length;
      } else {
        serializableValue = value.name;
      }
    }
    processFormChange(field.sys.id, serializableValue);
  };

  return createElement(Component, {
    id: field.sys.id,
    field,
    fieldLabel: label?.value || '',
    value,
    onChange: conditionAwareOnChange,
    accept: accept?.value?.formats.join(', ') || '',
    required: isRequired,
    hidden: isHidden,
  } satisfies FileFieldProps);
}

export default FileProvider;
