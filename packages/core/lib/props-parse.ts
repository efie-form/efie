import type {
  BorderRadiusProperty,
  BoxShadowProperty,
  FontSizeProperty,
  FontWeightProperty,
  MarginProperty,
  PaddingProperty,
  TextAlignProperty,
  WidthProperty,
} from './types/field-properties.type';
import { TextAlign, SizeType } from './types/form-schema.constant';
import type { Size, MarginSize, PaddingSize, FontSize, WidthHeightSize, Color } from './types/common.type';

export const toSize = (size?: Size | MarginSize | PaddingSize | FontSize | WidthHeightSize) => {
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

function radiusToSize(radius: Size | Size[]) {
  if (Array.isArray(radius)) {
    return radius.map(s => toSize(s)).join(' ');
  }
  return toSize(radius);
}

export const borderRadiusToStyle = (borderRadius?: BorderRadiusProperty['value']) => {
  if (!borderRadius) return;

  const topLeft = radiusToSize(borderRadius.topLeft);
  const topRight = radiusToSize(borderRadius.topRight);
  const bottomLeft = radiusToSize(borderRadius.bottomLeft);
  const bottomRight = radiusToSize(borderRadius.bottomRight);

  if (
    topLeft === topRight
    && topRight === bottomLeft
    && bottomLeft === bottomRight
  ) {
    return topLeft;
  }

  if (topLeft === bottomLeft && topRight === bottomRight) {
    return `${topLeft} ${topRight}`;
  }

  return `${topLeft} ${topRight} ${bottomRight} ${bottomLeft}`;
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

export const widthToStyle = (width?: WidthProperty) => {
  if (!width) return;

  return toSize(width.value);
};

const textAlignMap = {
  [TextAlign.LEFT]: 'start',
  [TextAlign.CENTER]: 'center',
  [TextAlign.RIGHT]: 'end',
} as const;

export const textAlignToStyle = (textAlign?: TextAlignProperty) => {
  if (!textAlign) return;

  return textAlignMap[textAlign.value];
};

export const colorToStyle = (color?: Color) => {
  if (!color) return;

  return color.hex;
};

export const fontSizeToStyle = (fontSize?: FontSizeProperty) => {
  if (!fontSize) return;

  return toSize(fontSize.value);
};

export const fontWeightToStyle = (fontWeight?: FontWeightProperty) => {
  if (!fontWeight) return;

  return fontWeight.value;
};

export const sizeToStyle = (size?: Size) => {
  if (!size) return;

  return toSize(size);
};
