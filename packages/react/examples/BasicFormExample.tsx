import { useState } from 'react';
import { StatefulForm, FormSchema, FormFieldType } from '@efie-form/react';

/**
 * Basic example of using the StatefulForm component with default components
 */
function BasicFormExample() {
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  
  // Example form schema
  const schema: FormSchema = {
    version: 'v1',
    form: {
      fields: [
        {
          id: 'page1',
          type: FormFieldType.PAGE,
          props: { name: 'Contact Information' },
          children: [
            {
              id: 'name',
              type: FormFieldType.SHORT_TEXT,
              props: [
                { type: 'label', value: 'Full Name' },
                { type: 'required', value: true },
                { type: 'placeholder', value: 'Enter your full name' },
              ],
            },
            {
              id: 'email',
              type: FormFieldType.SHORT_TEXT,
              props: [
                { type: 'label', value: 'Email Address' },
                { type: 'required', value: true },
                { type: 'placeholder', value: 'Enter your email address' },
              ],
            },
            {
              id: 'message',
              type: FormFieldType.LONG_TEXT,
              props: [
                { type: 'label', value: 'Message' },
                { type: 'placeholder', value: 'Enter your message' },
              ],
            },
            {
              id: 'submit',
              type: FormFieldType.BUTTON,
              props: [
                { type: 'label', value: 'Submit' },
              ],
            },
          ],
        },
      ],
      rules: [],
    },
  };

  // Form validation function
  const validateForm = (values: Record<string, any>) => {
    const errors: Record<string, string> = {};
    
    if (!values.name) {
      errors.name = 'Name is required';
    }
    
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    
    return errors;
  };

  // Form submission handler
  const handleSubmit = (values: Record<string, any>) => {
    console.log('Form submitted with values:', values);
    alert('Form submitted successfully!');
  };

  return (
    <div className="example-container">
      <h1>Contact Form Example</h1>
      
      <StatefulForm
        schema={schema}
        onChange={setFormValues}
        validate={validateForm}
        onSubmit={handleSubmit}
      />
      
      <div className="form-values">
        <h2>Current Form Values:</h2>
        <pre>{JSON.stringify(formValues, null, 2)}</pre>
      </div>
    </div>
  );
}

export default BasicFormExample;
