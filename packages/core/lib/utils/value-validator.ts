import type { Color, Size } from '../types/common.type';
import type { PropValue, PropValueAccept, PropValueBoolean, PropValueBorderRadius, PropValueBoxShadow, PropValueButtonAction, PropValueColor, PropValueMargin, PropValueNumber, PropValueOptions, PropValueSize, PropValueString } from '../types/field-property-value.type';
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
  return isColor(value);
}

export function isBorderRadiusValue(value?: PropValue): value is PropValueBorderRadius {
  return (
    !!value
    && typeof value === 'object'
    && 'topLeft' in value
    && 'topRight' in value
    && 'bottomLeft' in value
    && 'bottomRight' in value
    && isSize(value.topLeft)
    && isSize(value.topRight)
    && isSize(value.bottomLeft)
    && isSize(value.bottomRight)
  );
}

export function isBoxShadowValue(value?: PropValue): value is PropValueBoxShadow {
  return (
    !!value
    && Array.isArray(value)
    && value.every(
      shadow => typeof shadow === 'object'
        && 'x' in shadow
        && isSize(shadow.x)
        && 'y' in shadow
        && isSize(shadow.y)
        && 'blur' in shadow
        && isSize(shadow.blur)
        && 'spread' in shadow
        && isSize(shadow.spread)
        && 'color' in shadow
        && isColor(shadow.color),
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

export function isButtonActionValue(value?: PropValue): value is PropValueButtonAction {
  return (
    !!value
    && typeof value === 'object'
    && ('action' in value)
    && (
      (
        value.action === 'hyperlink' && 'url' in value && typeof value.url === 'string'
        && (!('target' in value) || typeof value.target === 'string')
      )
      || value.action === 'submit'
      || (
        value.action === 'navigate' && 'pageId' in value && typeof value.pageId === 'string'
      )
    )
  );
}

export function isJsonContentValue(value?: PropValue): value is PropValueString {
  return (
    !!value
    && typeof value === 'object'
    && 'jsonContent' in value
  );
}

export function isColor(value: unknown): value is Color {
  if (!value || typeof value !== 'object') {
    return false;
  }

  // Validate RGBA values
  if ('rgba' in value && value.rgba && typeof value.rgba === 'object') {
    if (!('r' in value.rgba) || !('g' in value.rgba) || !('b' in value.rgba) || !('a' in value.rgba)) {
      return false;
    }

    if (typeof value.rgba.r !== 'number' || typeof value.rgba.g !== 'number' || typeof value.rgba.b !== 'number' || typeof value.rgba.a !== 'number') {
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
  if ('hsla' in value && value.hsla && typeof value.hsla === 'object') {
    if (!('h' in value.hsla) || !('s' in value.hsla) || !('l' in value.hsla) || !('a' in value.hsla)) {
      return false;
    }

    if (typeof value.hsla.h !== 'number' || typeof value.hsla.s !== 'number' || typeof value.hsla.l !== 'number' || typeof value.hsla.a !== 'number') {
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
  if ('hex' in value && value.hex && typeof value.hex === 'string' && /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(value.hex)) {
    return true;
  }

  return false;
}
