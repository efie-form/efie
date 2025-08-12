import { type FormField, PropertyType } from '@efie-form/core';
import { useMemo } from 'react';
import { StyledSelect } from '../../../../components/form';
import { fieldIcons } from '../../../../lib/fields-tab/fields';
import { useSchemaStore } from '../../../../lib/state/schema.state';
import { getAllFields } from '../../../../lib/state/schema.state/utils';
import { getFieldProp, isInputField } from '../../../../lib/utils';

interface FieldsSelectProps {
  value?: FormField;
  onChange?: (value: FormField) => void;
}

export default function FieldsSelect({ value, onChange }: FieldsSelectProps) {
  // Select only the fields tree from the store; derive a stable flattened list locally.
  const fieldsTree = useSchemaStore((state) => state.schema?.form.fields);
  const allFields = useMemo(() => (fieldsTree ? getAllFields(fieldsTree) : []), [fieldsTree]);

  return (
    <StyledSelect
      options={allFields.filter(isInputField).map((field) => {
        const Icon = fieldIcons[field.type];

        return {
          value: field.id,
          label: getFieldProp(field, PropertyType.LABEL)?.value || '',
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
