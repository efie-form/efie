import type { ReactNode } from 'react';

interface SettingsFieldBasicProps {
  label: string;
  children?: ReactNode;
  divider?: boolean;
}

function SettingsFieldBasic({
  children,
  label,
  divider,
}: SettingsFieldBasicProps) {
  return (
    <>
      <div className="flex justify-between px-4 py-3.5 items-center">
        <div>
          <p className="typography-body3 text-neutral-800">{label}</p>
        </div>
        <div>{children}</div>
      </div>
      {divider && (
        <div className="mx-4">
          <div className="w-full border-t-[0.5px] border-neutral-400 h-[1px]" />
        </div>
      )}
    </>
  );
}

export default SettingsFieldBasic;
