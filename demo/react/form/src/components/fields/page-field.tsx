import type { PageFieldProps } from '@efie-form/react';

function PageField({ children }: PageFieldProps) {
  return <div className="mx-auto w-full max-w-[90vw] py-8 md:w-[32rem]">{children}</div>;
}

export default PageField;
