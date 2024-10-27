import type { FormField } from '../types/formSchema.ts';
import { DROP_ZONE_TYPE } from './constant.ts';

export default function insertField(
  fields: FormField[],
  newField: FormField,
  dropZoneType: string,
  parentId: string | null,
  index: number
) {
  if (dropZoneType === DROP_ZONE_TYPE.root) {
    fields.splice(index, 0, newField);
    return fields;
  }

  return findAndInsert(fields, newField, parentId, index);
}

function findAndInsert(
  fields: FormField[],
  newField: FormField,
  parentId: string | null,
  index: number
) {
  return fields.map((field) => {
    if (field.id === parentId && 'children' in field) {
      field.children.splice(index, 0, newField);
    }
    if (field.id !== parentId && 'children' in field) {
      field.children = findAndInsert(field.children, newField, parentId, index);
    }
    return field;
  });
}
