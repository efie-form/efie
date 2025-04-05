import type { BlockFieldProps } from '@efie-form/react';

function BlockField({
  children,
  margin,
  backgroundColor,
  color,
  padding,
  boxShadow,
  borderRadius,
}: BlockFieldProps) {
  return (
    <div
      style={{
        margin,
        padding,
        backgroundColor,
        color,
        boxShadow,
        borderRadius,
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
}

export default BlockField;
