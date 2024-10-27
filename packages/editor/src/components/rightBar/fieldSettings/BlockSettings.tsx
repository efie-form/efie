import type { FormFieldBlock } from '../../../types/formSchema.ts';

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
