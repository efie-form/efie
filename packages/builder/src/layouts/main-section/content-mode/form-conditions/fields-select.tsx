import type { FieldType, FormField } from '@efie-form/core';
import { useMemo } from 'react';
import { StyledSelect } from '../../../../components/form';
import { fieldIcons } from '../../../../lib/fields-tab/fields';
import { useSchemaStore } from '../../../../lib/state/schema.state';
import { getAllFields } from '../../../../lib/state/schema.state/utils';

interface FieldsSelectProps {
  value?: FormField;
  onChange?: (value: FormField) => void;
  fieldTypes?: FieldType[];
}

export default function FieldsSelect({ value, onChange, fieldTypes }: FieldsSelectProps) {
  const fieldsTree = useSchemaStore((state) => state.schema?.form.fields);
  const allFields = useMemo(() => (fieldsTree ? getAllFields(fieldsTree) : []), [fieldsTree]);

  return (
    <StyledSelect
      options={allFields
        .filter((field) => !fieldTypes || fieldTypes?.includes(field.sys.type))
        .map((field) => {
          const Icon = fieldIcons[field.sys.type];
          return {
            value: field.sys.id,
            label: field.sys.name,
            Icon: Icon,
          };
        })}
      searchable
      value={value?.id}
      onChange={(id) => {
        const field = allFields.find((f) => f.id === id);

        if (field) onChange?.(field);
      }}
    />
  );
}
