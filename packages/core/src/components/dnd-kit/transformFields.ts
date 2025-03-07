import type { FormField } from '../../../../core-old';

interface TransformFieldsProps {
  fields: FormField[];
  overFieldId: string;
  direction: 'up' | 'down';
  activeFieldId?: string;
}

export default function transformFields({
  fields,
  overFieldId,
  direction,
  activeFieldId,
}: TransformFieldsProps) {
  if (activeFieldId) {
    // move field
    checkMoveDirection(fields, activeFieldId, overFieldId, direction);
    // console.log({ moveDirection });
  }
}

const hasChildren = (field: FormField) => 'children' in field;

const checkMoveDirection = (
  fields: FormField[],
  activeFieldId: string,
  overFieldId: string,
  direction: 'up' | 'down'
) => {
  const fieldPathMap = new Map<string, string>();
  generateLocationMap(fields, '0', (id, path) => {
    fieldPathMap.set(id, path);
  });
  const activeFieldPath = fieldPathMap.get(activeFieldId);
  const overFieldPath = fieldPathMap.get(overFieldId);
  if (!activeFieldPath || !overFieldPath) return;

  return checkDirection(activeFieldPath, overFieldPath, direction);
};

const generateLocationMap = (
  fields: FormField[],
  parentPath: string,
  cb: (id: string, path: string) => void
) => {
  for (const [index, field] of fields.entries()) {
    const path = `${parentPath}${index}`;
    cb(field.id, path);

    if (hasChildren(field)) {
      generateLocationMap(field.children, path, cb);
    }
  }
};

const checkDirection = (
  activeFieldPath: string,
  overFieldPath: string,
  direction: 'up' | 'down'
) => {
  if (activeFieldPath.length === overFieldPath.length) {
    // same children
    const activeIndex = Number.parseInt(activeFieldPath.slice(-1), 10);
    const overIndex = Number.parseInt(overFieldPath.slice(-1), 10);

    const dropIndex = direction === 'up' ? overIndex : overIndex + 1;

    if (activeIndex === dropIndex) return;
    return activeIndex > dropIndex ? 'up' : 'down';
  }
  const totalLength = Math.max(activeFieldPath.length, overFieldPath.length);
  for (let i = 0; i < totalLength; i++) {
    const activeIndex = activeFieldPath[i];
    const overIndex = overFieldPath[i];
    if (activeIndex === overIndex) continue;
    return activeIndex > overIndex ? 'up' : 'down';
  }

  return;
};
