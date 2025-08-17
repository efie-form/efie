import { type FieldType, type FormField, PropertyType } from '@efie-form/core';
import { useMemo } from 'react';
import { StyledSelect } from '../../../../components/form';
import { FIELDS_NAME } from '../../../../lib/constant';
import { fieldIcons } from '../../../../lib/fields-tab/fields';
import { useSchemaStore } from '../../../../lib/state/schema.state';
import { getAllFields } from '../../../../lib/state/schema.state/utils';
import { getFieldProp } from '../../../../lib/utils';

interface FieldsSelectProps {
  value?: FormField;
  onChange?: (value: FormField) => void;
  fieldTypes?: FieldType[];
}

export default function FieldsSelect({ value, onChange, fieldTypes }: FieldsSelectProps) {
  // Select only the fields tree from the store; derive a stable flattened list locally.
  const fieldsTree = useSchemaStore((state) => state.schema?.form.fields);
  const allFields = useMemo(() => (fieldsTree ? getAllFields(fieldsTree) : []), [fieldsTree]);

  return (
    <StyledSelect
      options={allFields
        .filter((field) => !fieldTypes || fieldTypes?.includes(field.type))
        .map((field) => {
          const Icon = fieldIcons[field.type];
          return {
            value: field.id,
            label:
              getFieldProp(field, PropertyType.LABEL)?.value ||
              `${FIELDS_NAME[field.type]} #${field.id}`,
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
