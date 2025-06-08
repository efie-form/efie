import type { Color } from './types/common.type';
import type { PropertyDefinition } from './types/field-properties.type';

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

  if (!('rgb' in value) || !('rgba' in value) || !('hsl' in value) || !('hsla' in value) || !('hex' in value)) {
    return false;
  }

  // Validate RGBA values
  if (value.rgba) {
    if (!('r' in value.rgba) || !('g' in value.rgba) || !('b' in value.rgba) || !('a' in value.rgba)) {
      return false;
    }

    if (!Number.isFinite(value.rgba.r)
      || !Number.isFinite(value.rgba.g)
      || !Number.isFinite(value.rgba.b)
      || !Number.isFinite(value.rgba.a)) {
      return false;
    }

    if (value.rgba.r < 0 || value.rgba.r > 255
      || value.rgba.g < 0 || value.rgba.g > 255
      || value.rgba.b < 0 || value.rgba.b > 255
      || value.rgba.a < 0 || value.rgba.a > 1) {
      return false;
    }
  }

  // Validate HSLA values
  if (value.hsla) {
    if (!('h' in value.hsla) || !('s' in value.hsla) || !('l' in value.hsla) || !('a' in value.hsla)) {
      return false;
    }

    if (!Number.isFinite(value.hsla.h)
      || !Number.isFinite(value.hsla.s)
      || !Number.isFinite(value.hsla.l)
      || !Number.isFinite(value.hsla.a)) {
      return false;
    }

    if (value.hsla.h < 0 || value.hsla.h > 360
      || value.hsla.s < 0 || value.hsla.s > 100
      || value.hsla.l < 0 || value.hsla.l > 100
      || value.hsla.a < 0 || value.hsla.a > 1) {
      return false;
    }
  }

  // Validate HEX value
  if (value.hex && (typeof value.hex !== 'string' || !/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(value.hex))) {
    return false;
  }

  return true;
}
