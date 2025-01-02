import Switch from '../../../components/form/Switch.tsx';
import { Controller, useWatch } from 'react-hook-form';
import type { ReactNode } from 'react';

interface SettingsFieldSwitchWithDropdownProps {
  label: string;
  divider?: boolean;
  switchKey: string;
  switchLabel?: string;
  children?: ReactNode;
  expandState?: boolean;
}

function SettingsFieldSwitchWithDropdown({
  label,
  divider,
  switchKey,
  switchLabel,
  children,
  expandState = true,
}: SettingsFieldSwitchWithDropdownProps) {
  const isEnabled = useWatch({
    name: switchKey,
  });

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
            <Controller
              render={({ field: { value, onChange } }) => (
                <Switch checked={value} onChange={onChange} />
              )}
              name={switchKey}
            />
          </div>
        </div>
        {isEnabled === expandState && <div className="mt-5">{children}</div>}
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
