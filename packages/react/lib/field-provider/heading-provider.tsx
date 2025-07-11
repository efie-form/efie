import type { ElementType } from 'react';
import { createElement } from 'react';
import type { HeadingFieldProps, RenderContentOptions } from '../../types/field-props';
import { PropertyType, type HeadingFormField } from '@efie-form/core';
import ContentRenderer from '../utils/content-renderer';

interface HeadingProviderProps {
  field: HeadingFormField;
  Component?: ElementType<HeadingFieldProps>;
}

function HeadingProvider({ field, Component }: HeadingProviderProps) {
  if (!Component) return <></>;

  const content = field.props.find(prop => prop.type === PropertyType.CONTENT);

  const renderContent = (options?: Partial<RenderContentOptions>) => {
    return (
      <>
        <ContentRenderer
          content={content?.value?.jsonContent || { type: 'doc', content: [] }}
          options={options}
        />
      </>
    );
  };

  return createElement(Component, {
    id: field.id,
    field,
    render: renderContent,
  });
}

export default HeadingProvider;
