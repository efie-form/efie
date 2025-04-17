import type { DividerFieldProps } from '../../types/FieldProps';

/**
 * Default Divider Field component
 * 
 * A horizontal divider line
 */
function DividerField({
  id,
  color,
  width,
  style,
}: DividerFieldProps) {
  const dividerStyle = {
    borderTop: `${width}px ${style} ${color}`,
    width: '100%',
    margin: '1rem 0',
  };

  return (
    <div
      id={id}
      style={dividerStyle}
      className="efie-field-divider"
      role="separator"
    />
  );
}

export default DividerField;
