import { FieldType } from '@efie-form/core';

const isNewField = (source: unknown): source is { type: FieldType; formKey?: string } => {
  return typeof source === 'object'
    && source !== null
    && 'action' in source
    && source.action === 'new'
    && 'type' in source
    && typeof source.type === 'string'
    && Object.values(FieldType).includes(source.type as FieldType);
};

export default isNewField;
