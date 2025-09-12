import type { FieldType, FormField, FormSchema } from '@efie-form/core';
import { FIELDS_NAME } from './constant';

const getNameList = (fields: FormField[]) => {
  return fields.flatMap((field) => {
    const names = [field.sys.name];
    if ('children' in field && Array.isArray(field.children)) {
      names.push(...getNameList(field.children));
    }
    return names;
  });
};

export const generateFieldName = (fieldType: FieldType, index: number) => {
  return `#${index} ${FIELDS_NAME[fieldType]}`;
};

export const getNextFieldCount = (schema?: FormSchema) => {
  const nameList = getNameList(schema?.form.fields || []);
  const totalFields = nameList.length;
  const _maxNumber = nameList.map((name) => {
    const match = name.match(/^#(\d+)\s.*/);
    return match ? parseInt(match[1], 10) : 0;
  });
  return Math.max(0, ..._maxNumber, totalFields) + 1;
};
