import type { ElementType } from 'react';
import { createElement } from 'react';
import type { BlockFieldProps, FieldPropsMap } from '../../types/field-props';
import {
  borderRadiusToStyle,
  boxShadowToStyle,
  marginToStyle,
  paddingToStyle,
  PropertyType,
  type BlockFormField,
} from '@efie-form/core';
import RenderField from '../render-field';

interface BlockProviderProps extends Partial<FieldPropsMap> {
  field: BlockFormField;
  Component?: ElementType<BlockFieldProps>;
}

function BlockProvider({ field, Component, ...props }: BlockProviderProps) {
  if (!Component) return <></>;

  const margin = field.props.find(field => field.type === PropertyType.MARGIN);
  const padding = field.props.find(field => field.type === PropertyType.PADDING);
  const borderRadius = field.props.find(
    field => field.type === PropertyType.BORDER_RADIUS,
  );
  const boxShadow = field.props.find(
    field => field.type === PropertyType.BOX_SHADOW,
  );
  const bgColor = field.props.find(
    field => field.type === PropertyType.BACKGROUND_COLOR,
  );
  const color = field.props.find(field => field.type === PropertyType.COLOR);

  return createElement(Component, {
    id: field.id,
    fieldId: field.id,
    field,
    blockMargin: marginToStyle(margin?.value),
    blockPadding: paddingToStyle(padding?.value),
    blockBorderRadius: borderRadiusToStyle(borderRadius?.value),
    blockColor: color?.value as string | undefined,
    blockBackgroundColor: bgColor?.value as string | undefined,
    blockBoxShadow: boxShadowToStyle(boxShadow?.value),
    style: {},
    children: (
      <>
        {field.children.map(field => (
          <RenderField
            key={field.id}
            field={field}
            {...props}
          />
        ))}
      </>
    ),
  });
}

export default BlockProvider;
