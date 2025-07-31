import { FormBuilder, useFormBuilder, useWatchSchema } from '@efie-form/builder';
import { Builder, type FormSchema } from '@efie-form/core';
import { useCallback, useEffect, useRef } from 'react';

function App() {
  const builderRef = useRef<Builder | undefined>(undefined);
  const formBuilderInterface = useFormBuilder();

  // Watch for schema changes with useCallback to prevent unnecessary re-renders
  const handleSchemaChange = useCallback((schema: FormSchema) => {
    console.log('Schema changed in iframe:', schema);
    if (builderRef.current) {
      builderRef.current.onBuilderSchemaChange(schema);
    }
  }, []);

  useWatchSchema(handleSchemaChange);

  useEffect(() => {
    // Only initialize once
    if (builderRef.current) return;

    // Initialize the Builder class for iframe communication
    const builder = new Builder({
      onReady: () => {
        console.log('Form builder iframe is ready');
      },
    });

    // Connect the builder interface
    builder.setBuilderInterface(formBuilderInterface);

    builderRef.current = builder;

    return () => {
      if (builderRef.current) {
        builderRef.current.destroy();
        builderRef.current = undefined;
      }
    };
  }, []); // Empty dependency array - only run once

  return <FormBuilder />;
}

export default App;
