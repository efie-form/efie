import type { Size } from '../types/common.type';
import type { PropertyDefinition, WidthProperty } from '../types/field-properties.type';
import type { PropValue, PropValueAccept, PropValueBoolean, PropValueBorderRadius, PropValueBoxShadow, PropValueColor, PropValueMargin, PropValueNumber, PropValueOptions, PropValueSize, PropValueString } from '../types/field-property-value.type';
import { SizeType } from '../constants/form-schema.constant';

export function isStringValue(value?: PropValue): value is PropValueString {
  return (
    !!value
    && typeof value === 'string'
  );
}

export function isNumberValue(value?: PropValue): value is PropValueNumber {
  return (
    value !== undefined && typeof value === 'number'
  );
}

export function isBooleanValue(value?: PropValue): value is PropValueBoolean {
  return (
    value !== undefined
    && typeof value === 'boolean'
  );
}

export function isColorValue(value?: PropValue): value is PropValueColor {
  if (!value || typeof value !== 'object') {
    return false;
  }

  // Validate RGBA values
  if ('rgba' in value && value.rgba) {
    if (!('r' in value.rgba) || !('g' in value.rgba) || !('b' in value.rgba) || !('a' in value.rgba)) {
      return false;
    }

    if (value.rgba.r >= 0 && value.rgba.r <= 255
      && value.rgba.g >= 0 && value.rgba.g <= 255
      && value.rgba.b >= 0 && value.rgba.b <= 255
      && value.rgba.a >= 0 && value.rgba.a <= 1) {
      return true;
    }
  }

  // Validate HSLA values
  if ('hsla' in value && value.hsla) {
    if (!('h' in value.hsla) || !('s' in value.hsla) || !('l' in value.hsla) || !('a' in value.hsla)) {
      return false;
    }

    if (value.hsla.h >= 0 && value.hsla.h <= 360
      && value.hsla.s >= 0 && value.hsla.s <= 100
      && value.hsla.l >= 0 && value.hsla.l <= 100
      && value.hsla.a >= 0 && value.hsla.a <= 1) {
      return true;
    }
  }

  // Validate HEX value
  if ('hex' in value && value.hex && /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(value.hex)) {
    return true;
  }

  return false;
}

export function isWidthValue(props?: PropertyDefinition): props is WidthProperty {
  if (!props || !('value' in props) || typeof props.value !== 'object') {
    return false;
  }
  return true;
}

export function isBorderRadiusValue(value?: PropValue): value is PropValueBorderRadius {
  return (
    !!value
    && typeof value === 'object'
    && 'topLeft' in value
    && 'topRight' in value
    && 'bottomLeft' in value
    && 'bottomRight' in value
  );
}

export function isBoxShadowValue(value?: PropValue): value is PropValueBoxShadow {
  return (
    !!value
    && Array.isArray(value)
    && value.every(
      shadow => typeof shadow === 'object'
        && 'x' in shadow
        && 'y' in shadow
        && 'blur' in shadow
        && 'spread' in shadow
        && 'color' in shadow,
    )
  );
}

export function isSizeValue(value?: PropValue): value is PropValueSize {
  return isSize(value);
}

export function isAcceptValue(value?: PropValue): value is PropValueAccept {
  return (
    !!value
    && typeof value === 'object'
    && 'allowAll' in value
    && typeof value.allowAll === 'boolean'
    && 'formats' in value
    && Array.isArray(value.formats)
  );
}

export function isMarginValue(value?: PropValue): value is PropValueMargin {
  return (
    !!value
    && typeof value === 'object'
    && 'top' in value
    && 'right' in value
    && 'bottom' in value
    && 'left' in value
    && isSize(value.top)
    && isSize(value.right)
    && isSize(value.bottom)
    && isSize(value.left)
  );
}

export function isSize(value: unknown): value is Size {
  return (
    !!value
    && typeof value === 'object'
    && 'type' in value
    && Object.values(SizeType).includes((value as Size).type)
  );
}

export function isOptionsValue(value?: PropValue): value is PropValueOptions {
  return (
    Array.isArray(value)
    && value.every(item => typeof item === 'object' && 'label' in item && 'value' in item)
  );
}

export function isPaddingValue(value?: PropValue): value is PropValueMargin {
  return (
    !!value
    && typeof value === 'object'
    && 'top' in value
    && 'right' in value
    && 'bottom' in value
    && 'left' in value
    && isSize(value.top)
    && isSize(value.right)
    && isSize(value.bottom)
    && isSize(value.left)
  );
}
