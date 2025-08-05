import { type FileFormField, PropertyType } from '@efie-form/core';
import { useRef } from 'react';
import { MdOutlineCloudUpload } from 'react-icons/md';
import { useSchemaStore } from '../../../../lib/state/schema.state';
import { getFieldProp } from '../../../../lib/utils';

interface FileFieldProps {
  field: FileFormField;
}

function FileField({ field }: FileFieldProps) {
  const fieldProperty = useSchemaStore((state) =>
    state.getFieldProperty(field.id, PropertyType.LABEL),
  );
  const label = fieldProperty?.value || '';
  const updateFieldProperty = useSchemaStore((state) => state.updateFieldProperty);
  const acceptProp = getFieldProp(field, PropertyType.ACCEPT);

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="p-2">
      <input
        value={label}
        onChange={(e) =>
          updateFieldProperty(field.id, {
            type: PropertyType.LABEL,
            value: e.target.value,
          })
        }
        className="typography-body2 mb-2 w-full cursor-text bg-white bg-opacity-0 focus:outline-none"
        type="text"
      />
      <div className="flex flex-col items-center justify-center gap-2 rounded-md border-2 border-neutral-300 border-dashed px-4 py-12">
        <input type="file" className="hidden" ref={fileInputRef} />
        <MdOutlineCloudUpload size={48} className="text-neutral-300" />
        <p className="typography-body2 text-neutral-500">Choose a file or drag & drop it here</p>
      </div>
      <div className="typography-body3 mt-2 flex justify-between text-neutral-500">
        {!acceptProp?.value?.allowAll && (
          <p>
            Supported formats:
            {acceptProp?.value?.formats?.join(', ')}
          </p>
        )}
      </div>
    </div>
  );
}

export default FileField;
