import Switch from '../../../components/form/Switch.tsx';
import { useEffect, useState, type ReactNode } from 'react';
import type { FormField } from '@efie-form/core';
import type { FieldPropsKey } from '../../../lib/genFieldKey.ts';
import { useSchemaStore } from '../../../lib/state/schema.state.ts';

interface SettingsFieldSwitchWithDropdownProps {
  label: string;
  divider?: boolean;
  field: FormField;
  switchKey: FieldPropsKey;
  switchLabel?: string;
  children?: ReactNode;
  expandState?: boolean;
  defaultExpanded?: boolean;
}

function SettingsFieldSwitchWithDropdown({
  label,
  divider,
  switchKey,
  field,
  switchLabel,
  children,
  expandState = true,
  defaultExpanded = false,
}: SettingsFieldSwitchWithDropdownProps) {
  const { getFieldProps, updateFieldProps } = useSchemaStore();
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  useEffect(() => {
    if (!switchKey) return;
    updateFieldProps(field.id, switchKey, isExpanded);
  }, [isExpanded, field.id, switchKey, updateFieldProps]);

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
            <Switch checked={isExpanded} onChange={setIsExpanded} />
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
