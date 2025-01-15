import { BlockFieldProps } from '@efie-form/react';

function BlockField({
  children,
  margin,
  backgroundColor,
  color,
  padding,
  boxShadow,
  borderRadius,
}: BlockFieldProps) {
  console.log({
    margin,
    padding,
    backgroundColor,
    color,
    boxShadow,
    borderRadius,
  });

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
