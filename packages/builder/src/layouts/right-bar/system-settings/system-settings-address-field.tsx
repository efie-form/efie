import type { FieldSystemConfigAddressField } from '@efie-form/core';

interface FieldSettingsProps {
  config: FieldSystemConfigAddressField;
  fieldId: string;
}

export default function SystemSettingsAddressField({ config, fieldId }: FieldSettingsProps) {
  return <div>Address Field Settings</div>;
}
