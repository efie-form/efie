import type { ElementType } from 'react';
import { createElement } from 'react';
import type { BlockFieldProps, FieldPropsMap } from '../../types/FieldProps';
import type { FormFieldBlock } from '@efie-form/core';
import RenderField from '../RenderField';
import { toMarginStyle } from '../utils/toMargin';
import { toPaddingStyle } from '../utils/toPadding';
import { toBorderRadius } from '../utils/toBorderRadius';
import { toBgColorStyle, toColorStyle } from '../utils/color';
import { toBoxShadowStyle } from '../utils/boxShadow';

interface BlockProviderProps extends Partial<FieldPropsMap> {
  field: FormFieldBlock;
  Component?: ElementType<BlockFieldProps>;
}

function BlockProvider({ field, Component, ...props }: BlockProviderProps) {
  if (!Component) return <></>;

  return createElement(Component, {
    id: field.id,
    margin: toMarginStyle(field.props.margin),
    padding: toPaddingStyle(field.props.padding),
    borderRadius: toBorderRadius(field.props.border.radius),
    color: toColorStyle(field.props.color),
    backgroundColor: toBgColorStyle(field.props.bgColor),
    boxShadow: toBoxShadowStyle(field.props.boxShadow),
    children: (
      <>
        {field.children.map(field => (
          <div key={field.id}>
            <RenderField field={field} {...props} />
          </div>
        ))}
      </>
    ),
  });
}

export default BlockProvider;
