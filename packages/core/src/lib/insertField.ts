import type { FormField, FormFieldType } from '../types/formSchema.ts';
import defaultFieldProps from './defaultFieldProps.ts';
import { DROP_ZONE_TYPE } from './constant.ts';

export default function insertField(
  fields: FormField[],
  type: FormFieldType,
  dropZoneType: string,
  parentId: string | null,
  index: number
) {
  if (dropZoneType === DROP_ZONE_TYPE.root) {
    fields.splice(index, 0, defaultFieldProps[type]());
    return fields;
  }

  if (dropZoneType === DROP_ZONE_TYPE.emptyColumn) {
  }

  return findAndInsert(fields, type, parentId, index);
}

function findAndInsert(
  fields: FormField[],
  type: FormFieldType,
  parentId: string | null,
  index: number
) {
  return fields.map((field) => {
    if (field.id === parentId && 'children' in field) {
      field.children.splice(index, 0, defaultFieldProps[type]());
    }
    if (field.id !== parentId && 'children' in field) {
      field.children = findAndInsert(field.children, type, parentId, index);
    }
    return field;
  });
}
