import type { FormField } from '@efie-form/core';
import { useRef, useState } from 'react';
import { useSchemaStore } from '../../../../lib/state/schema.state';

interface FieldNameProps {
  field: FormField;
}

export default function FieldName({ field }: FieldNameProps) {
  const renameField = useSchemaStore((s) => s.renameField);
  const oriNameRef = useRef(field.sys.name);
  const [inputName, setInputName] = useState<string>(field.sys.name);
  const [editMode, setEditMode] = useState(false);

  const handleRename = (newName: string) => {
    setInputName(newName);
    renameField(field.id, newName);
  };

  const handleBlur = () => {
    setEditMode(false);
    if (inputName.trim() === '') {
      handleRename(oriNameRef.current);
      setInputName(oriNameRef.current);
    }
  };

  return (
    <div
      role="button"
      className="absolute bottom-0 right-0 bg-primary translate-y-full px-2 py-0.5"
      onDoubleClick={() => {
        setEditMode(true);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleBlur();
        }
      }}
      tabIndex={0}
    >
      {editMode ? (
        <input
          type="text"
          value={inputName}
          onChange={(e) => handleRename(e.target.value)}
          onBlur={handleBlur}
          className="bg-opacity-0 bg-white text-white typography-body3 outline-none line-clamp-none [field-sizing:content]"
        />
      ) : (
        <p className="text-white typography-body3 whitespace-pre">{inputName}</p>
      )}
    </div>
  );
}
