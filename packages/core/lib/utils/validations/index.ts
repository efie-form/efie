import { FieldType } from '../../constants/field-type';
import type { FormField } from '../../types/form-field.type';
import type { FormSchema } from '../../types/form-schema.type';
import type { PropertyDefinition } from '../../types/property-definition';

const ROOT_KEYS = ['version', 'form'] as const;

export default function validateSchema(schema?: unknown): schema is FormSchema {
  if (!schema) return false;
  if (!isObject(schema)) return false;
  if (!ROOT_KEYS.every((key) => key in schema)) return false;
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
  if (fields.some((fields) => !validateField(fields))) return false;
  return true;
}

function validateField(field: unknown): field is FormField {
  if (!isObject(field)) {
    return false;
  }
  if (!('id' in field) || typeof field.id !== 'string') {
    return false;
  }
  if (!('type' in field) || typeof field.type !== 'string') {
    return false;
  }
  if (!Object.values(FieldType).includes(field.type as FieldType)) {
    return false;
  }

  if (!('props' in field) || !Array.isArray(field.props)) {
    return false;
  }
  const fieldProps = field.props as PropertyDefinition[];

  if (
    !fieldProps.every((prop) => {
      const isValid = validatePropertyDefinition(prop);
      return isValid;
    })
  )
    return false;
  if ('children' in field && !Array.isArray(field.children)) {
    return false;
  }
  if (
    field.children &&
    Array.isArray(field.children) &&
    field.children.some((child) => !validateField(child))
  ) {
    return false;
  }

  return true;
}

function validatePropertyDefinition(prop: unknown): prop is PropertyDefinition {
  if (!isObject(prop)) return false;
  if (!('type' in prop) || typeof prop.type !== 'string') return false;
  if (!('value' in prop)) return false;
  return true;

  // const fieldType = prop.type as PropertyType;
  // const propValue = prop.value as PropValue;

  // switch (fieldType) {
  //   case PropertyType.CONTENT: {
  //     if (!isJsonContentValue(propValue))
  //       console.warn(`Invalid JSON content value for property type ${fieldType}:`, propValue);
  //     return isJsonContentValue(propValue);
  //   }
  //   case PropertyType.PLACEHOLDER:
  //   case PropertyType.SRC:
  //   case PropertyType.ALT:
  //   case PropertyType.BORDER_STYLE:
  //   case PropertyType.PAGE_NAME:
  //   case PropertyType.OBJECT_FIT:
  //   case PropertyType.TEXT_ALIGN:
  //   case PropertyType.TAG:
  //   case PropertyType.LABEL: {
  //     if (!isStringValue(propValue))
  //       console.warn(`Invalid string value for property type ${fieldType}:`, propValue);
  //     return isStringValue(propValue);
  //   }
  //   case PropertyType.FONT_WEIGHT:
  //   case PropertyType.MAX_FILES: {
  //     if (!isNumberValue(propValue))
  //       console.warn(`Invalid number value for property type ${fieldType}:`, propValue);
  //     return isNumberValue(propValue);
  //   }
  //   case PropertyType.ACCEPT: {
  //     if (!isAcceptValue(propValue))
  //       console.warn(`Invalid accept value for property type ${fieldType}:`, propValue);
  //     return isAcceptValue(propValue);
  //   }
  //   case PropertyType.REQUIRED: {
  //     if (!isBooleanValue(propValue))
  //       console.warn(`Invalid boolean value for property type ${fieldType}:`, propValue);
  //     return isBooleanValue(propValue);
  //   }
  //   case PropertyType.OPTIONS: {
  //     if (!isOptionsValue(propValue))
  //       console.warn(`Invalid options value for property type ${fieldType}:`, propValue);
  //     return isOptionsValue(propValue);
  //   }
  //   case PropertyType.BUTTON_ACTION: {
  //     if (!isButtonActionValue(propValue))
  //       console.warn(`Invalid button action value for property type ${fieldType}:`, propValue);
  //     return isButtonActionValue(propValue);
  //   }
  //   case PropertyType.CUSTOM: {
  //     // Custom properties can have any value, so we don't validate the value
  //     // TODO: Implement custom validation logic if needed
  //     return true;
  //   }
  //   default: {
  //     return fieldType;
  //   }
  // }
}
