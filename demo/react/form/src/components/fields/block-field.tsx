import type { BlockFieldProps } from '@efie-form/react';

function BlockField({ children }: BlockFieldProps) {
  return (
    <div
      style={{
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
