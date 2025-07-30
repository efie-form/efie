import { SizeType } from '../constants/form-schema.constant';
import type { Color, Size } from '../types/common.type';
import type {
  PropValueBorderRadius,
  PropValueBoxShadow,
  PropValueMargin,
  PropValuePadding,
  PropValueSize,
} from '../types/field-property-value.type';

export const toSize = (size?: Size) => {
  if (!size) return;

  switch (size.type) {
    case SizeType.AUTO: {
      return 'auto';
    }
    case SizeType.INITIAL: {
      return 'initial';
    }
    case SizeType.INHERIT: {
      return 'inherit';
    }
    case SizeType.LENGTH: {
      if (size.value === 0) return '0';
      return `${size.value}${size.unit}`;
    }
    case SizeType.PERCENTAGE: {
      if (size.value === 0) return '0';
      return `${size.value}%`;
    }
    case SizeType.ABSOLUTE: {
      return size.value;
    }
    case SizeType.RELATIVE: {
      return size.value;
    }
    default: {
      return;
    }
  }
};

export const marginToStyle = (margin?: PropValueMargin) => {
  if (!margin) return;

  const top = toSize(margin.top);
  const right = toSize(margin.right);
  const bottom = toSize(margin.bottom);
  const left = toSize(margin.left);

  if (top === right && right === bottom && bottom === left) {
    return top;
  }

  if (top === bottom && right === left) {
    return `${top} ${right}`;
  }

  return `${top} ${right} ${bottom} ${left}`;
};

export const paddingToStyle = (padding?: PropValuePadding) => {
  if (!padding) return;

  const top = toSize(padding.top);
  const right = toSize(padding.right);
  const bottom = toSize(padding.bottom);
  const left = toSize(padding.left);

  if (top === right && right === bottom && bottom === left) {
    return top;
  }

  if (top === bottom && right === left) {
    return `${top} ${right}`;
  }

  return `${top} ${right} ${bottom} ${left}`;
};

function radiusToSize(radius: Size | Size[]) {
  if (Array.isArray(radius)) {
    return radius.map((s) => toSize(s)).join(' ');
  }
  return toSize(radius);
}

export const borderRadiusToStyle = (borderRadius?: PropValueBorderRadius) => {
  if (!borderRadius) return;

  const topLeft = radiusToSize(borderRadius.topLeft);
  const topRight = radiusToSize(borderRadius.topRight);
  const bottomLeft = radiusToSize(borderRadius.bottomLeft);
  const bottomRight = radiusToSize(borderRadius.bottomRight);

  if (topLeft === topRight && topRight === bottomLeft && bottomLeft === bottomRight) {
    return topLeft;
  }

  if (topLeft === bottomLeft && topRight === bottomRight) {
    return `${topLeft} ${topRight}`;
  }

  return `${topLeft} ${topRight} ${bottomRight} ${bottomLeft}`;
};

export const boxShadowToStyle = (boxShadow?: PropValueBoxShadow) => {
  if (!boxShadow) return;

  return boxShadow
    .map((shadow) => {
      const x = toSize(shadow.x);
      const y = toSize(shadow.y);
      const blur = toSize(shadow.blur);
      const spread = toSize(shadow.spread);
      const color = shadow.color.hex;
      const inset = shadow.inset ? 'inset' : '';
      return `${x} ${y} ${blur} ${spread} ${color} ${inset}`;
    })
    .join(',');
};

export const widthToStyle = (width?: PropValueSize) => {
  if (!width) return;

  return toSize(width);
};

export const colorToStyle = (color?: Color) => {
  if (!color) return;

  return color.hex;
};

export const sizeToStyle = (size?: Size) => {
  if (!size) return;

  return toSize(size);
};
