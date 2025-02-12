import type { FormFieldNumber } from '@efie-form/core';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical.tsx';
import Input from '../../../components/form/Input.tsx';
import { useSchemaStore } from '../../../lib/state/schema.state.ts';
import ContainerSettingsGroup from '../common/ContainerSettingsGroup.tsx';

interface NumberSettingsProps {
  field: FormFieldNumber;
}

function NumberSettings({ field }: NumberSettingsProps) {
  const { updateFieldProps } = useSchemaStore();

  return (
    <div>
      <div>
        <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body2">
          General
        </div>
        <SettingsFieldVertical label="Label" divider>
          <Input
            onChange={(value) =>
              updateFieldProps(field.id, 'props.label', value)
            }
            value={field.props.label}
          />
        </SettingsFieldVertical>
        <SettingsFieldVertical label="Placeholder" divider>
          <Input
            onChange={(value) =>
              updateFieldProps(field.id, 'props.placeholder', value)
            }
            value={field.props.placeholder}
          />
        </SettingsFieldVertical>
        <ContainerSettingsGroup field={field} />
      </div>
    </div>
  );
}

export default NumberSettings;
