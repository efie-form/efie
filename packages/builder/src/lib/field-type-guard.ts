import { FieldType } from '@efie-form/core';

export const isNewField = (source: unknown): source is { type: FieldType; formKey?: string } => {
  return (
    typeof source === 'object' &&
    source !== null &&
    'action' in source &&
    source.action === 'new' &&
    'type' in source &&
    typeof source.type === 'string' &&
    Object.values(FieldType).includes(source.type as FieldType)
  );
};

export const isMoveField = (source: unknown): source is { id: string; type: FieldType } => {
  return (
    typeof source === 'object' &&
    source !== null &&
    'id' in source &&
    typeof source.id === 'string' &&
    source.id.length > 0 &&
    'type' in source &&
    typeof source.type === 'string' &&
    Object.values(FieldType).includes(source.type as FieldType)
  );
};
