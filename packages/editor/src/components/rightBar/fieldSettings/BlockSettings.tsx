import type { FormFieldBlock } from '@efie-form/core';

interface BlockSettingsProps {
  field: FormFieldBlock;
  fieldKey: string;
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
