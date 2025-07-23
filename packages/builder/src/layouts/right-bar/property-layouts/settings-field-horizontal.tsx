import type { ReactNode } from 'react';

interface SettingsFieldHorizontalProps {
  label: string;
  children?: ReactNode;
  divider?: boolean;
}

function SettingsFieldHorizontal({ children, label, divider }: SettingsFieldHorizontalProps) {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-3.5">
        <p className="typography-body3 text-neutral-800">{label}</p>
        <div>{children}</div>
      </div>
      {divider && (
        <div className="mx-4">
          <div className="h-[1px] w-full border-neutral-400 border-t-[0.5px]" />
        </div>
      )}
    </>
  );
}

export default SettingsFieldHorizontal;
