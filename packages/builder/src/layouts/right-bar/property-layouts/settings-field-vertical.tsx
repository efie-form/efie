import type { ReactNode } from 'react';

interface SettingsFieldBasicProps {
  label: string;
  children?: ReactNode;
  divider?: boolean;
}

function SettingsFieldVertical({ children, label, divider }: SettingsFieldBasicProps) {
  return (
    <>
      <div className="px-4 py-3.5">
        <div className="mb-1">
          <p className="typography-body3 text-neutral-800">{label}</p>
        </div>
        <div>{children}</div>
      </div>
      {divider && (
        <div className="mx-4">
          <div className="h-px w-full border-neutral-400 border-t-[0.5px]" />
        </div>
      )}
    </>
  );
}

export default SettingsFieldVertical;
