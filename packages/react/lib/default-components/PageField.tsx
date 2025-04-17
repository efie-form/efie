import type { PageFieldProps } from '../../types/FieldProps';

/**
 * Default Page Field component
 * 
 * A container for a form page
 */
function PageField({
  id,
  children,
}: PageFieldProps) {
  return (
    <div
      id={id}
      className="efie-field-page"
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '1rem',
      }}
    >
      {children}
    </div>
  );
}

export default PageField;
