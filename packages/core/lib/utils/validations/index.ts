import { FieldType } from '../../constants/field-type';
import { PropertyType } from '../../constants/form-schema.constant';
import type { PropValue } from '../../types/field-property-value.type';
import type { FormField } from '../../types/form-field.type';
import type { FormSchema } from '../../types/form-schema.type';
import { isAcceptValue, isBooleanValue, isBorderRadiusValue, isBoxShadowValue, isButtonActionValue, isColorValue, isJsonContentValue, isMarginValue, isNumberValue, isOptionsValue, isPaddingValue, isSizeValue, isStringValue } from '../value-validator';

const ROOT_KEYS = ['version', 'form'] as const;

export default function validateSchema(schema?: unknown): schema is FormSchema {
  if (!schema) return false;
  console.log('Validating schema:', schema);
  if (!isObject(schema)) return false;
  console.log('Schema is an object:', schema);
  if (!(ROOT_KEYS.every(key => key in schema))) return false;
  console.log('Schema has all required root keys:', schema);
  if (!isCorrectVersion(schema.version)) return false;
  console.log('Schema has correct version:', schema.version);
  if (!isObject(schema.form)) return false;
  console.log('Schema form is an object:', schema.form);
  if (!validateFields(schema.form.fields)) return false;
  console.log('Schema form fields are valid:', schema.form.fields);

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
  if (!isObject(field)) {
    console.log('Field is not an object:', field);
    return false;
  }
  if (!('id' in field) || typeof field.id !== 'string') {
    console.log('Field id is not a string:', field);
    return false;
  }
  if (!('type' in field) || typeof field.type !== 'string') {
    console.log('Field type is not a string:', field);
    return false;
  }
  if (!Object.values(FieldType).includes(field.type as FieldType)) {
    console.log('Field type is not a valid FieldType:', field);
    return false;
  }

  if (!('props' in field) || !Array.isArray(field.props)) {
    console.log('Field props is not an array:', field);
    return false;
  }
  const fieldProps = field.props as PropertyDefinition[];

  if (!fieldProps.every((prop) => {
    const isValid = validatePropertyDefinition(prop);
    if (!isValid) {
      console.warn(`Invalid property definition for field ${field.id}:`, prop);
    }
    return isValid;
  })) return false;
  if ('children' in field && !Array.isArray(field.children)) {
    console.log('Field children is not an array:', field);
    return false;
  }
  if (field.children && Array.isArray(field.children) && field.children.some(child => !validateField(child))) {
    console.log('Field children is not a valid array of fields:', field);
    return false;
  }

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
      if (!isJsonContentValue(propValue)) console.warn(`Invalid JSON content value for property type ${fieldType}:`, propValue);
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
      if (!isStringValue(propValue)) console.warn(`Invalid string value for property type ${fieldType}:`, propValue);
      return isStringValue(propValue);
    }
    case PropertyType.FONT_WEIGHT:
    case PropertyType.MAX_FILES: {
      if (!isNumberValue(propValue)) console.warn(`Invalid number value for property type ${fieldType}:`, propValue);
      return isNumberValue(propValue);
    }
    case PropertyType.ACCEPT: {
      if (!isAcceptValue(propValue)) console.warn(`Invalid accept value for property type ${fieldType}:`, propValue);
      return isAcceptValue(propValue);
    }
    case PropertyType.REQUIRED: {
      if (!isBooleanValue(propValue)) console.warn(`Invalid boolean value for property type ${fieldType}:`, propValue);
      return isBooleanValue(propValue);
    }
    case PropertyType.WIDTH:
    case PropertyType.FONT_SIZE:
    case PropertyType.BORDER_WIDTH:
    case PropertyType.HEIGHT: {
      if (!isSizeValue(propValue)) console.warn(`Invalid size value for property type ${fieldType}:`, propValue);
      return isSizeValue(propValue);
    }
    case PropertyType.COLOR:
    case PropertyType.BORDER_COLOR:
    case PropertyType.BACKGROUND_COLOR: {
      if (!isColorValue(propValue)) console.warn(`Invalid color value for property type ${fieldType}:`, propValue);
      return isColorValue(propValue);
    }
    case PropertyType.BORDER_RADIUS: {
      if (!isBorderRadiusValue(propValue)) console.warn(`Invalid border radius value for property type ${fieldType}:`, propValue);
      return isBorderRadiusValue(propValue);
    }
    case PropertyType.MARGIN: {
      if (!isMarginValue(propValue)) console.warn(`Invalid margin value for property type ${fieldType}:`, propValue);
      return isMarginValue(propValue);
    }
    case PropertyType.PADDING: {
      if (!isPaddingValue(propValue)) console.warn(`Invalid padding value for property type ${fieldType}:`, propValue);
      return isPaddingValue(propValue);
    }
    case PropertyType.BOX_SHADOW: {
      if (!isBoxShadowValue(propValue)) console.warn(`Invalid box shadow value for property type ${fieldType}:`, propValue);
      return isBoxShadowValue(propValue);
    }
    case PropertyType.OPTIONS: {
      if (!isOptionsValue(propValue)) console.warn(`Invalid options value for property type ${fieldType}:`, propValue);
      return isOptionsValue(propValue);
    }
    case PropertyType.BUTTON_ACTION: {
      if (!isButtonActionValue(propValue)) console.warn(`Invalid button action value for property type ${fieldType}:`, propValue);
      return isButtonActionValue(propValue);
    }
    case PropertyType.CUSTOM: {
      // Custom properties can have any value, so we don't validate the value
      // TODO: Implement custom validation logic if needed
      return true;
    }
    default: {
      return fieldType;
    }
  }
}
