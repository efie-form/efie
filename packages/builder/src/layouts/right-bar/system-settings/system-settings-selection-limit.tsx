import type { FieldSystemConfigSelectionLimit } from '@efie-form/core';
import NumberInput from '../../../components/form/number';
import SettingsFieldVertical from '../property-layouts/settings-field-vertical';

interface SystemSettingsSelectionLimitProps {
  fieldId: string;
  config: FieldSystemConfigSelectionLimit;
}

export default function SystemSettingsSelectionLimit({
  fieldId,
  config,
}: SystemSettingsSelectionLimitProps) {
  return (
    <SettingsFieldVertical divider label={config.label}>
      <div className="flex gap-2 items-center mt-2">
        <div>
          <p className="typography-body3 text-neutral-700">Min</p>
          <NumberInput />
        </div>
        <span className="typography-body3 text-neutral-700">-</span>
        <div>
          <p className="typography-body3 text-neutral-700">Max</p>
          <NumberInput />
        </div>
      </div>
    </SettingsFieldVertical>
  );
}
