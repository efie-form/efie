import type { BlockFieldProps } from '../../types/FieldProps';

/**
 * Default Block Field component
 * 
 * A container block with styling options
 */
function BlockField({
  id,
  children,
  borderRadius,
  boxShadow,
  backgroundColor,
  color,
  padding,
  margin,
}: BlockFieldProps) {
  const style = {
    borderRadius,
    boxShadow,
    backgroundColor,
    color,
    padding,
    margin,
  };

  return (
    <div id={id} style={style} className="efie-field-block">
      {children}
    </div>
  );
}

export default BlockField;
