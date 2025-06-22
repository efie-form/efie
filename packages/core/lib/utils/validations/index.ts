import { FieldType } from '../../constants/field-type';
import { PropertyType } from '../../constants/form-schema.constant';
import type { PropValue } from '../../types/field-property-value.type';
import type { FormField } from '../../types/form-field.type';
import type { FormSchema } from '../../types/form-schema.type';
import { isAcceptValue, isBooleanValue, isBorderRadiusValue, isBoxShadowValue, isButtonActionValue, isColorValue, isJsonContentValue, isMarginValue, isNumberValue, isOptionsValue, isPaddingValue, isSizeValue, isStringValue } from '../value-validator';

const ROOT_KEYS = ['version', 'form'] as const;

export default function validateSchema(schema?: unknown): schema is FormSchema {
  if (!schema) return false;
  if (!isObject(schema)) return false;
  if (!(ROOT_KEYS.every(key => key in schema))) return false;
  if (!isCorrectVersion(schema.version)) return false;
  if (!isObject(schema.form)) return false;
  if (!validateFields(schema.form.fields)) return false;

  return true;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isCorrectVersion(version: unknown): boolean {
  if (typeof version !== 'string') return false;
  if (!/^v\d+$/.test(version)) return false;
  return true;
}

function validateFields(fields: unknown): boolean {
  if (!Array.isArray(fields)) return false;
  if (fields.some(fields => !validateField(fields))) return false;
  return true;
}

function validateField(field: unknown): field is FormField {
  if (!isObject(field)) return false;
  if (!('id' in field) || typeof field.id !== 'string') return false;
  if (!('type' in field) || typeof field.type !== 'string') return false;
  if (!Object.values(FieldType).includes(field.type as FieldType)) return false;

  if (!('props' in field) || !Array.isArray(field.props)) return false;
  const fieldProps = field.props as PropertyDefinition[];

  if (!fieldProps.every((prop) => {
    const isValid = validatePropertyDefinition(prop);
    return isValid;
  })) return false;
  if ('children' in field && !Array.isArray(field.children)) return false;
  if (field.children && Array.isArray(field.children) && field.children.some(child => !validateField(child))) return false;

  return true;
}

function validatePropertyDefinition(prop: unknown): prop is PropertyDefinition {
  if (!isObject(prop)) return false;
  if (!('type' in prop) || typeof prop.type !== 'string') return false;
  if (!('value' in prop)) return false;

  const fieldType = prop.type as PropertyType;
  const propValue = prop.value as PropValue;

  switch (fieldType) {
    case PropertyType.CONTENT: {
      return isJsonContentValue(propValue);
    }
    case PropertyType.PLACEHOLDER:
    case PropertyType.SRC:
    case PropertyType.ALT:
    case PropertyType.BORDER_STYLE:
    case PropertyType.PAGE_NAME:
    case PropertyType.OBJECT_FIT:
    case PropertyType.TEXT_ALIGN:
    case PropertyType.TAG:
    case PropertyType.LABEL: {
      return isStringValue(propValue);
    }
    case PropertyType.FONT_WEIGHT:
    case PropertyType.MAX_FILES: {
      return isNumberValue(propValue);
    }
    case PropertyType.ACCEPT: {
      return isAcceptValue(propValue);
    }
    case PropertyType.REQUIRED: {
      return isBooleanValue(propValue);
    }
    case PropertyType.WIDTH:
    case PropertyType.FONT_SIZE:
    case PropertyType.BORDER_WIDTH:
    case PropertyType.HEIGHT: {
      return isSizeValue(propValue);
    }
    case PropertyType.COLOR:
    case PropertyType.BORDER_COLOR:
    case PropertyType.BACKGROUND_COLOR: {
      return isColorValue(propValue);
    }
    case PropertyType.BORDER_RADIUS: {
      return isBorderRadiusValue(propValue);
    }
    case PropertyType.MARGIN: {
      return isMarginValue(propValue);
    }
    case PropertyType.PADDING: {
      return isPaddingValue(propValue);
    }
    case PropertyType.BOX_SHADOW: {
      return isBoxShadowValue(propValue);
    }
    case PropertyType.OPTIONS: {
      return isOptionsValue(propValue);
    }
    case PropertyType.BUTTON_ACTION: {
      return isButtonActionValue(propValue);
    }
    default: {
      return fieldType;
    }
  }
}
