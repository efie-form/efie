import type { FormFieldFile } from '../../../../../types/formSchema.type.ts';
import { MdOutlineCloudUpload } from 'react-icons/md';
import { useRef } from 'react';
import { useSchemaStore } from '../../../../lib/state/schema.state';

interface FileFieldProps {
  field: FormFieldFile;
}

function FileField({ field }: FileFieldProps) {
  const { updateFieldProps } = useSchemaStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="p-2">
      <input
        value={field.props.label}
        onChange={(e) =>
          updateFieldProps(field.id, 'props.label', e.target.value)
        }
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
