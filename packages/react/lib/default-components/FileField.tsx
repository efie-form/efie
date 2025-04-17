import type { FileFieldProps } from '../../types/FieldProps';

/**
 * Default File Field component
 * 
 * A file upload input field
 */
function FileField({
  id,
  value,
  onChange,
  label,
  required,
  disabled,
  accept,
  multiple,
  errors,
}: FileFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onChange(e.target.files[0]);
    }
  };

  return (
    <div className="efie-field-container">
      <label htmlFor={id} className="efie-field-label">
        {label}
        {required && <span className="efie-field-required">*</span>}
      </label>
      <div className="efie-field-file-container">
        <input
          id={id}
          type="file"
          onChange={handleChange}
          disabled={disabled}
          accept={accept}
          multiple={multiple}
          className="efie-field-file-input"
        />
        <div className="efie-field-file-info">
          {value?.name ? value.name : 'No file selected'}
        </div>
      </div>
      {errors?.message && (
        <div className="efie-field-error">{errors.message}</div>
      )}
    </div>
  );
}

export default FileField;
