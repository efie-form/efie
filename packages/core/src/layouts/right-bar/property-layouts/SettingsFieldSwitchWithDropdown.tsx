import Switch from '../../../components/form/Switch.tsx';
import type { ReactNode } from 'react';

interface SettingsFieldSwitchWithDropdownProps {
  label: string;
  divider?: boolean;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  switchLabel?: string;
  children?: ReactNode;
}

function SettingsFieldSwitchWithDropdown({
  label,
  divider,
  isOpen,
  onOpenChange,
  switchLabel,
  children,
}: SettingsFieldSwitchWithDropdownProps) {
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
            <Switch checked={isOpen} onChange={onOpenChange} />
          </div>
        </div>
        {isOpen && <div className="mt-5">{children}</div>}
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
