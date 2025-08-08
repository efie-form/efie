import type { FormField } from '@efie-form/core';

interface UrlFieldProps {
  field: FormField;
}

export default function UrlField({ field }: UrlFieldProps) {
  void field; // placeholder usage
  return <div>url field</div>;
}
