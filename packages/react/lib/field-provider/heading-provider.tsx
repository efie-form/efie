import { type HeadingFormField, PropertyType, type PropValueJsonContent } from '@efie-form/core';
import type { ElementType } from 'react';
import { createElement } from 'react';
import type { HeadingFieldProps, RenderContentOptions } from '../../types/field-props';
import { useFieldCondition } from '../hooks/use-field-condition';
import ContentRenderer from '../utils/content-renderer';

interface HeadingProviderProps {
  field: HeadingFormField;
  Component?: ElementType<HeadingFieldProps>;
}

function HeadingProvider({ field, Component }: HeadingProviderProps) {
  const { isVisible } = useFieldCondition(field.sys.id);

  if (!Component) return null;

  // Check if field should be visible
  if (!isVisible) {
    return null;
  }

  const content = field.props.find(
    (prop): prop is { type: typeof PropertyType.HEADING_CONTENT; value: PropValueJsonContent } =>
      prop.type === PropertyType.HEADING_CONTENT,
  );

  const renderContent = (options?: Partial<RenderContentOptions>) => {
    return (
      <ContentRenderer
        content={content?.value?.jsonContent || { type: 'doc', content: [] }}
        options={options}
      />
    );
  };

  return createElement(Component, {
    id: field.sys.id,
    field,
    render: renderContent,
  });
}

export default HeadingProvider;
