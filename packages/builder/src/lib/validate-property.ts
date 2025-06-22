import {
  isStringValue,
  isNumberValue,
  isBooleanValue,
  isColorValue,
  isBorderRadiusValue,
  isBoxShadowValue,
  isSizeValue,
  isAcceptValue,
  isMarginValue,
  isOptionsValue,
  isPaddingValue,
  isButtonActionValue,
  type PropertyDefinition,
  type PropValue,
} from '@efie-form/core';

export function validateProperty(prop: PropertyDefinition): boolean {
  switch (prop.type) {
    case 'label':
    case 'placeholder':
    case 'tag':
    case 'src':
    case 'alt':
    case 'borderStyle':
    case 'pageName': {
      return isStringValue(prop.value as PropValue);
    }
    case 'required': {
      return isBooleanValue(prop.value as PropValue);
    }
    case 'maxFiles':
    case 'fontWeight': {
      return isNumberValue(prop.value as PropValue);
    }
    case 'color':
    case 'backgroundColor':
    case 'borderColor': {
      return isColorValue(prop.value as PropValue);
    }
    case 'width':
    case 'height':
    case 'fontSize':
    case 'borderWidth': {
      return isSizeValue(prop.value as PropValue);
    }
    case 'accept': {
      return isAcceptValue(prop.value as PropValue);
    }
    case 'options': {
      return isOptionsValue(prop.value as PropValue);
    }
    case 'margin': {
      return isMarginValue(prop.value as PropValue);
    }
    case 'padding': {
      return isPaddingValue(prop.value as PropValue);
    }
    case 'borderRadius': {
      return isBorderRadiusValue(prop.value as PropValue);
    }
    case 'boxShadow': {
      return isBoxShadowValue(prop.value as PropValue);
    }
    case 'buttonAction': {
      return isButtonActionValue(prop.value as PropValue);
    }
    case 'textAlign':
    case 'objectFit': {
      return typeof prop.value === 'string';
    }
    case 'content': {
      return prop.value && typeof prop.value === 'object' && 'jsonContent' in prop.value;
    }
    default: {
      return true;
    }
  }
}
