import type { BlockFieldProps } from '@efie-form/react';

function BlockField({
  children,
  style,
}: BlockFieldProps) {
  return (
    <div
      style={{
        ...style?.container,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {children}
    </div>
  );
}

export default BlockField;
