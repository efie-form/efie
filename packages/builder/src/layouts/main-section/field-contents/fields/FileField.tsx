import { PropertyType, type FileFormField } from '@efie-form/core';
import { MdOutlineCloudUpload } from 'react-icons/md';
import { useRef } from 'react';
import { useFieldLabel } from '../../../../lib/hooks/properties/useFieldLabel';
import { getFieldProp } from '../../../../lib/utils';

interface FileFieldProps {
  field: FileFormField;
}

function FileField({ field }: FileFieldProps) {
  const { label, updateLabel } = useFieldLabel(field);
  const acceptProp = getFieldProp(field, PropertyType.ACCEPT);
  const maxFilesProp = getFieldProp(field, PropertyType.MAX_FILES);

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="p-2">
      <input
        value={label}
        onChange={e => updateLabel(e.target.value)}
        className="mb-2 typography-body2 bg-white bg-opacity-0 focus:outline-none cursor-text w-full"
        type="text"
      />
      <div className="flex justify-center flex-col items-center px-4 gap-2 border-2 border-neutral-300 border-dashed rounded-md py-12">
        <input type="file" className="hidden" ref={fileInputRef} />
        <MdOutlineCloudUpload size={48} className="text-neutral-300" />
        <p className="text-neutral-500 typography-body2">
          Choose a file or drag & drop it here
        </p>
      </div>
      <div className="flex justify-between text-neutral-500 typography-body3 mt-2">
        {!acceptProp?.value?.allowAll && (
          <p>
            Supported formats:
            {acceptProp?.value?.formats?.join(', ')}
          </p>
        )}
        {maxFilesProp && maxFilesProp?.value > 1 && (
          <p>
            Max files:
            {maxFilesProp?.value}
          </p>
        )}
      </div>
    </div>
  );
}

export default FileField;
