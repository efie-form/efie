import type { FormField } from '../types/formSchema.ts';
import useMoveField from '../lib/hooks/useMoveField.ts';
import {
  DATASET_DROP_ZONE,
  DATASET_FORM_FIELD,
  DROP_ZONE_TYPE,
} from '../lib/constant.ts';
import ColumnsField from './fieldContents/ColumnsField.tsx';
import RowField from './fieldContents/RowField.tsx';

interface RenderFieldProps {
  field: FormField;
  disableDrag?: boolean;
}

function RenderField({ field, disableDrag }: RenderFieldProps) {
  const { registerProps } = useMoveField();

  return (
    <>
      <div
        id={field.id}
        key={field.id}
        className="border border-white hover:border-neutral-100 rounded-lg cursor-grab transform bg-white"
        {...{
          [DATASET_FORM_FIELD]: field.id,
          [DATASET_DROP_ZONE]: DROP_ZONE_TYPE.field,
        }}
        {...(!disableDrag && {
          ...registerProps(field.id),
        })}
      >
        <FieldItem field={field} />
      </div>
    </>
  );
}

function FieldItem({ field }: RenderFieldProps) {
  switch (field.type) {
    case 'row':
      return <RowField field={field} />;
    case 'column':
      return <ColumnsField field={field} />;
    default:
      return (
        <div className="px-4 py-2">
          {field.id} {field.type}
        </div>
      );
  }
}

export default RenderField;
