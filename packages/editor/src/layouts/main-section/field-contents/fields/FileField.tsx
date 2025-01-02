import type { FormFieldFile, FormSchema } from '@efie-form/core';
import { useFormContext } from 'react-hook-form';
import { MdOutlineCloudUpload } from 'react-icons/md';
import { useRef } from 'react';
import type { FieldKeyPrefix } from '../../../../lib/genFieldKey.ts';
import genFieldKey from '../../../../lib/genFieldKey.ts';

interface FileFieldProps {
  field: FormFieldFile;
  fieldKey: FieldKeyPrefix;
}

function FileField({ fieldKey, field }: FileFieldProps) {
  const { register } = useFormContext<FormSchema>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="p-2">
      <input
        {...register(genFieldKey(fieldKey, 'props.label'))}
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
        <p>Supported formats: {field.props.accept}</p>
        <p></p>
      </div>
    </div>
  );
}

export default FileField;
