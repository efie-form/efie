import type { FormFieldColumn } from '../../types/formSchema.ts';

interface ColumnsFieldProps {
  field: FormFieldColumn;
}

function ColumnsField({ field }: ColumnsFieldProps) {
  return <div className="flex">{field.props.width}</div>;
}

export default ColumnsField;
