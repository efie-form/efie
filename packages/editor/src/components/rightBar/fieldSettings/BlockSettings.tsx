import type { FormFieldBlock } from '@efie-form/core';
import type { FieldKeyPrefix } from '../../../lib/genFieldKey.ts';

interface BlockSettingsProps {
  field: FormFieldBlock;
  fieldKey: FieldKeyPrefix;
}

function BlockSettings({ field }: BlockSettingsProps) {
  return (
    <div>
      {field.id}
      {field.type}
    </div>
  );
}

export default BlockSettings;
