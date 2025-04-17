import type { HeaderFieldProps } from '../../types/FieldProps';

/**
 * Default Header Field component
 * 
 * A heading element (h1-h6) for section titles
 */
function HeaderField({
  id,
  text,
  tag,
  textAlign,
  font,
}: HeaderFieldProps) {
  const Tag = tag;
  
  const style = {
    textAlign,
    fontSize: `${font.size}${font.unit}`,
    fontWeight: font.weight,
  };

  return (
    <Tag id={id} style={style} className="efie-field-header">
      {text}
    </Tag>
  );
}

export default HeaderField;
