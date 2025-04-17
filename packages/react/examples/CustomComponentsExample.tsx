import { ReactForm, FormSchema, FormFieldType, type ShortTextFieldProps, type LongTextFieldProps } from '@efie-form/react';

/**
 * Custom text field component
 */
function CustomTextField({
  id,
  value,
  onChange,
  label,
  required,
  placeholder,
  errors,
}: ShortTextFieldProps) {
  return (
    <div className="custom-field">
      <label htmlFor={id} className="custom-label">
        {label}
        {required && <span className="custom-required">*</span>}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="custom-input"
      />
      {errors?.message && (
        <div className="custom-error">{errors.message}</div>
      )}
    </div>
  );
}

/**
 * Custom textarea component
 */
function CustomTextArea({
  id,
  value,
  onChange,
  label,
  required,
  placeholder,
  errors,
}: LongTextFieldProps) {
  return (
    <div className="custom-field">
      <label htmlFor={id} className="custom-label">
        {label}
        {required && <span className="custom-required">*</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="custom-textarea"
        rows={5}
      />
      {errors?.message && (
        <div className="custom-error">{errors.message}</div>
      )}
    </div>
  );
}

/**
 * Example of using ReactForm with custom components
 */
function CustomComponentsExample() {
  // Example form schema
  const schema: FormSchema = {
    version: 'v1',
    form: {
      fields: [
        {
          id: 'page1',
          type: FormFieldType.PAGE,
          props: { name: 'Feedback Form' },
          children: [
            {
              id: 'name',
              type: FormFieldType.SHORT_TEXT,
              props: [
                { type: 'label', value: 'Your Name' },
                { type: 'required', value: true },
              ],
            },
            {
              id: 'feedback',
              type: FormFieldType.LONG_TEXT,
              props: [
                { type: 'label', value: 'Your Feedback' },
                { type: 'required', value: true },
                { type: 'placeholder', value: 'Please share your thoughts...' },
              ],
            },
          ],
        },
      ],
      rules: [],
    },
  };

  return (
    <div className="example-container">
      <h1>Custom Components Example</h1>
      
      <ReactForm
        schema={schema}
        shortText={CustomTextField}
        longText={CustomTextArea}
      />
      
      <div className="custom-styles">
        <style>{`
          .custom-field {
            margin-bottom: 20px;
          }
          
          .custom-label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
            color: #333;
          }
          
          .custom-required {
            color: #e53e3e;
            margin-left: 4px;
          }
          
          .custom-input,
          .custom-textarea {
            width: 100%;
            padding: 10px;
            border: 2px solid #cbd5e0;
            border-radius: 4px;
            font-size: 16px;
            transition: border-color 0.2s;
          }
          
          .custom-input:focus,
          .custom-textarea:focus {
            outline: none;
            border-color: #4299e1;
            box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
          }
          
          .custom-error {
            margin-top: 4px;
            color: #e53e3e;
            font-size: 14px;
          }
        `}</style>
      </div>
    </div>
  );
}

export default CustomComponentsExample;
