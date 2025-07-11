import type { HeadingFieldProps } from '@efie-form/react';

function HeadingField({ render }: HeadingFieldProps) {
  return <>{render()}</>;
}

export default HeadingField;
