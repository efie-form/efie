import type { BlockFieldProps } from '@efie-form/react/types/FieldProps.ts';

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
      className="efie-form-block"
      style={{
        margin,
        padding,
        backgroundColor,
        color,
        boxShadow,
        borderRadius,
      }}
    >
      {children}
    </div>
  );
}

export default BlockField;
