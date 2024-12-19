import type { PageFieldProps } from '@efie-form/react/types/FieldProps.ts';

function PageField({ children }: PageFieldProps) {
  return <div className="efie-form-container">{children}</div>;
}

export default PageField;
