import Switch from '../../../components/form/Switch.tsx';
import type { ReactNode } from 'react';
import { FormField } from '@efie-form/core';
import { FieldPropsKey } from '../../../lib/genFieldKey.ts';
import { useSchemaStore } from '../../../lib/state/schema.state.ts';

interface SettingsFieldSwitchWithDropdownProps {
  label: string;
  divider?: boolean;
  field: FormField;
  switchKey: FieldPropsKey;
  switchLabel?: string;
  children?: ReactNode;
  expandState?: boolean;
}

function SettingsFieldSwitchWithDropdown({
  label,
  divider,
  switchKey,
  field,
  switchLabel,
  children,
  expandState = true,
}: SettingsFieldSwitchWithDropdownProps) {
  const { getFieldProps, updateFieldProps } = useSchemaStore();

  return (
    <>
      <div className="px-4 py-3.5">
        <div className="flex justify-between items-center">
          <div>
            <p className="typography-body3 text-neutral-800">{label}</p>
          </div>
          <div className="flex gap-2 items-center">
            {switchLabel && (
              <p className="typography-body4 text-neutral-800">{switchLabel}</p>
            )}
            <Switch
              checked={getFieldProps(field.id, switchKey)}
              onChange={(value) => updateFieldProps(field.id, switchKey, value)}
            />
          </div>
        </div>
        {getFieldProps(field.id, switchKey) === expandState && (
          <div className="mt-5">{children}</div>
        )}
      </div>

      {divider && (
        <div className="mx-4">
          <div className="w-full border-t-[0.5px] border-neutral-400 h-[1px]" />
        </div>
      )}
    </>
  );
}

export default SettingsFieldSwitchWithDropdown;
