import type { Color } from './types/common.type';
import type { PropertyDefinition, WidthProperty } from './types/field-properties.type';
import { PropertyType } from './types/form-schema.constant';

export function isStringValue(props?: PropertyDefinition): props is Extract<PropertyDefinition, { value: string }> {
  return (
    !!props
    && 'value' in props
    && typeof props.value === 'string'
  );
}

export function isNumberValue(props?: PropertyDefinition): props is Extract<PropertyDefinition, { value: number }> {
  return (
    !!props
    && 'value' in props
    && typeof props.value === 'number'
    && !Number.isNaN(props.value)
  );
}

export function isBooleanValue(props?: PropertyDefinition): props is Extract<PropertyDefinition, { value: boolean }> {
  return (
    !!props
    && 'value' in props
    && typeof props.value === 'boolean'
    && (props.value === true || props.value === false)
  );
}

export function isColorValue(props?: PropertyDefinition): props is Extract<PropertyDefinition, { value: Color }> {
  if (!props || !('value' in props) || !props.value || typeof props.value !== 'object') {
    return false;
  }

  const value = props.value;

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

export function isBorderRadiusValue(props?: PropertyDefinition): props is Extract<PropertyDefinition, { type: typeof PropertyType.BORDER_RADIUS }> {
  return (
    !!props
    && 'value' in props
    && props.type === PropertyType.BORDER_RADIUS
    && typeof props.value === 'object'
    && 'topLeft' in props.value
    && 'topRight' in props.value
    && 'bottomLeft' in props.value
    && 'bottomRight' in props.value
    // TODO: Valid whether its size value
  );
}
