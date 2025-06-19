import type { PageFieldProps } from '@efie-form/react';

function PageField({ children }: PageFieldProps) {
  return (
    <div className="max-w-[90vw] w-full md:w-[32rem] mx-auto py-8">
      {children}
    </div>
  );
}

export default PageField;
