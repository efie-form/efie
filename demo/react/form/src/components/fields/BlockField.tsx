import type { BlockFieldProps } from '@efie-form/react';

function BlockField({
  children,
  blockMargin,
  blockBackgroundColor,
  blockColor,
  blockPadding,
  blockBoxShadow,
  blockBorderRadius,
}: BlockFieldProps) {
  return (
    <div
      style={{
        margin: blockMargin,
        padding: blockPadding,
        backgroundColor: blockBackgroundColor,
        color: blockColor,
        boxShadow: blockBoxShadow,
        borderRadius: blockBorderRadius,
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
