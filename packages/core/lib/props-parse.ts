import type {
  BorderRadiusProperty,
  BoxShadowProperty,
  MarginProperty,
  PaddingProperty,
} from './types/fieldProperties.type';
import type { Size } from './types/formSchema.type';

export const toSize = (size?: Size) => {
  if (!size) return;
  if (size.value === 0) return '0';

  return `${size.value}${size.unit}`;
};

export const marginToStyle = (margin?: MarginProperty) => {
  if (!margin) return;

  const top = toSize(margin.value.top);
  const right = toSize(margin.value.right);
  const bottom = toSize(margin.value.bottom);
  const left = toSize(margin.value.left);

  if (top === right && right === bottom && bottom === left) {
    return top;
  }

  if (top === bottom && right === left) {
    return `${top} ${right}`;
  }

  return `${top} ${right} ${bottom} ${left}`;
};

export const paddingToStyle = (padding?: PaddingProperty) => {
  if (!padding) return;

  const top = toSize(padding.value.top);
  const right = toSize(padding.value.right);
  const bottom = toSize(padding.value.bottom);
  const left = toSize(padding.value.left);

  if (top === right && right === bottom && bottom === left) {
    return top;
  }

  if (top === bottom && right === left) {
    return `${top} ${right}`;
  }

  return `${top} ${right} ${bottom} ${left}`;
};

export const borderRadiusToStyle = (borderRadius?: BorderRadiusProperty) => {
  if (!borderRadius) return;

  const topLeft = toSize(borderRadius.value.topLeft);
  const topRight = toSize(borderRadius.value.topRight);
  const bottomLeft = toSize(borderRadius.value.bottomLeft);
  const bottomRight = toSize(borderRadius.value.bottomRight);

  if (
    topLeft === topRight &&
    topRight === bottomLeft &&
    bottomLeft === bottomRight
  ) {
    return topLeft;
  }

  if (topLeft === bottomLeft && topRight === bottomRight) {
    return `${topLeft} ${topRight}`;
  }

  return `${topLeft} ${topRight} ${bottomLeft} ${bottomRight}`;
};

export const boxShadowToStyle = (boxShadow?: BoxShadowProperty) => {
  if (!boxShadow) return;

  return boxShadow.value
    .map((shadow) => {
      const x = toSize(shadow.x);
      const y = toSize(shadow.y);
      const blur = toSize(shadow.blur);
      const spread = toSize(shadow.spread);
      const color = shadow.color;
      const inset = shadow.inset ? 'inset' : '';
      return `${x} ${y} ${blur} ${spread} ${color} ${inset}`;
    })
    .join(',');
};
