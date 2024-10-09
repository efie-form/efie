import type { FormFieldColumn } from '../../types/formSchema.ts';
import RenderField from '../RenderField.tsx';
import {
  DATASET_DROP_ZONE,
  DATASET_FORM_FIELD,
  DROP_ZONE_TYPE,
} from '../../lib/constant.ts';

interface ColumnsFieldProps {
  field: FormFieldColumn;
}

function ColumnsField({ field }: ColumnsFieldProps) {
  return (
    <div>
      {field.children.map((child) => (
        <RenderField key={`${field.id}-${child.id}`} field={child} />
      ))}
      {field.children.length === 0 && <EmptyColumnsField field={field} />}
    </div>
  );
}

function EmptyColumnsField({ field }: ColumnsFieldProps) {
  return (
    <div
      {...{
        [DATASET_FORM_FIELD]: field.id,
        [DATASET_DROP_ZONE]: DROP_ZONE_TYPE.emptyColumn,
      }}
    >
      Drag and drop fields here
    </div>
  );
}

export default ColumnsField;
