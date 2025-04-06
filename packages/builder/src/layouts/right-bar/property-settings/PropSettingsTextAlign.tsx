import {
  PropertyType,
  type FormField,
  type TextAlignProperty,
} from '@efie-form/core';
import Select from '../../../components/form/Select';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { useControllableState } from '../../../lib/hooks/useControllableState';
import { getFieldProp } from '../../../lib/utils';

const defaultTextAlign: TextAlignProperty = {
  type: PropertyType.TEXT_ALIGN,
  value: 'left',
};

interface PropSettingsTextAlignProps {
  field: FormField;
}

export default function PropSettingsTextAlign({
  field,
}: PropSettingsTextAlignProps) {
  const { updateFieldProps } = useSchemaStore();
  const textAlign = getFieldProp(field, PropertyType.TEXT_ALIGN);
  const [textAlignValue, setTextAlignValue] = useControllableState({
    onChange: (value) => {
      updateFieldProps(field.id, PropertyType.TEXT_ALIGN, value);
    },
    defaultValue: textAlign || defaultTextAlign,
  });

  return (
    <SettingsFieldHorizontal label="Text Align" divider>
      <Select
        value={textAlignValue.value}
        onChange={(newValue) => {
          setTextAlignValue(prev => ({
            ...prev,
            value: newValue,
          }));
        }}
        options={[
          { value: 'left', label: 'Left' },
          { value: 'center', label: 'Center' },
          { value: 'right', label: 'Right' },
        ]}
      />
    </SettingsFieldHorizontal>
  );
}
