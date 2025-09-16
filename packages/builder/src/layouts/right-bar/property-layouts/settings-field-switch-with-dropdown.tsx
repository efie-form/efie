import type { ReactNode } from 'react';
import Switch from '../../../components/form/switch';

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
        <div className="flex items-center justify-between">
          <div>
            <p className="typography-body3 text-neutral-800">{label}</p>
          </div>
          <div className="flex items-center gap-2">
            {switchLabel && <p className="typography-body4 text-neutral-800">{switchLabel}</p>}
            <Switch checked={isOpen} onChange={onOpenChange} />
          </div>
        </div>
        {isOpen && <div className="mt-5">{children}</div>}
      </div>

      {divider && (
        <div className="mx-4">
          <div className="h-px w-full border-neutral-400 border-t-[0.5px]" />
        </div>
      )}
    </>
  );
}

export default SettingsFieldSwitchWithDropdown;
