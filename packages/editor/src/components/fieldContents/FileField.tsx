import type { FormFieldFile } from '@efie-form/core';
import useFieldInfo from '../../lib/hooks/useFieldInfo.ts';
import { Controller } from 'react-hook-form';
import { MdOutlineCloudUpload } from 'react-icons/md';
import { useRef } from 'react';

interface FileFieldProps {
  field: FormFieldFile;
}

function FileField({ field }: FileFieldProps) {
  const fieldInfo = useFieldInfo({
    fieldId: field.id,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!fieldInfo) return null;

  return (
    <div className="p-2">
      <Controller
        render={({ field: { value, onChange } }) => (
          <input
            className="mb-2 typography-body2 text-neutral-800 focus:outline-none cursor-text w-full"
            type="text"
            value={value}
            onChange={onChange}
          />
        )}
        name={`${fieldInfo.key}.props.label`}
      />
      <div className="flex justify-center flex-col items-center gap-2 border-2 border-neutral-300 border-dashed rounded-md py-12">
        <input type="file" className="hidden" ref={fileInputRef} />
        <MdOutlineCloudUpload size={48} className="text-neutral-300" />
        <p className="text-neutral-500 typography-body2">
          Choose a file or drag & drop it here
        </p>
      </div>
      <div className="flex justify-between text-neutral-500 typography-body3 mt-2">
        <p>Supported formats: {field.props.accept}</p>
        <p></p>
      </div>
    </div>
  );
}

export default FileField;
