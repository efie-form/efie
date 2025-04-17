import type { ParagraphFieldProps } from '../../types/FieldProps';

/**
 * Default Paragraph Field component
 * 
 * A paragraph element for text content
 */
function ParagraphField({
  id,
  text,
  textAlign,
  font,
}: ParagraphFieldProps) {
  const style = {
    textAlign,
    fontSize: `${font.size}${font.unit}`,
    fontWeight: font.weight,
  };

  return (
    <p id={id} style={style} className="efie-field-paragraph">
      {text}
    </p>
  );
}

export default ParagraphField;
