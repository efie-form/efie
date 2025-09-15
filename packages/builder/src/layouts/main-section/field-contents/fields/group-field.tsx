import type { GroupFormField } from '@efie-form/core';
import { PropertyType } from '@efie-form/core';
import { useEffect, useRef, useState } from 'react';
import { useSchemaStore } from '../../../../lib/state/schema.state';
import { cn } from '../../../../lib/utils';
import EmptyArea from '../../empty-area';
import RenderField from '../render-field';

interface GroupFieldProps {
  field: GroupFormField;
}

function GroupField({ field }: GroupFieldProps) {
  const nameProp = useSchemaStore((s) => s.getFieldProperty(field.sys.id, PropertyType.NAME));
  const updateFieldProperty = useSchemaStore((s) => s.updateFieldProperty);
  const name = typeof nameProp?.value === 'string' ? nameProp.value : 'Group';
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editMode) inputRef.current?.focus();
  }, [editMode]);

  const commit = () => {
    updateFieldProperty(field.sys.id, { type: PropertyType.NAME, value });
    setEditMode(false);
  };

  return (
    <div className="relative min-h-20 w-full rounded-lg border border-dashed border-neutral-300 p-4">
      <button
        type="button"
        className="absolute -top-2 left-2 typography-body4 bg-white px-2 py-0.5 text-neutral-600"
        onDoubleClick={() => setEditMode(true)}
        onClick={() => setEditMode(true)}
      >
        {editMode ? (
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commit();
              if (e.key === 'Escape') {
                e.stopPropagation();
                setValue(name);
                setEditMode(false);
              }
            }}
            className={cn('w-32 bg-transparent text-neutral-700 outline-none')}
          />
        ) : (
          <span>{value}</span>
        )}
      </button>
      {field.children.map((child, index) => (
        <RenderField fieldId={child.id} key={child.id} parentId={field.sys.id} childIndex={index} />
      ))}
      {field.children.length === 0 && <EmptyArea parentId={field.sys.id} />}
    </div>
  );
}

export default GroupField;
