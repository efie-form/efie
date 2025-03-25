import {
  PropertyType,
  type FormField,
  type MaxFilesProperty,
} from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { useControllableState } from '../../../lib/hooks/useControllableState';
import { Input } from '../../../components/form';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';

const defaultMaxFiles: MaxFilesProperty = {
  type: PropertyType.MAX_FILES,
  value: 1,
};

interface PropSettingsMaxFilesProps {
  field: FormField;
}

export default function PropSettingsMaxFiles({
  field,
}: PropSettingsMaxFilesProps) {
  const { updateFieldProps, getFieldProps } = useSchemaStore();
  const maxFilesProp = getFieldProps(field.id, PropertyType.MAX_FILES);
  const [maxFiles, setMaxFiles] = useControllableState({
    onChange: (value) => {
      updateFieldProps(field.id, PropertyType.MAX_FILES, value);
    },
    defaultValue: maxFilesProp || defaultMaxFiles,
  });

  const handleMaxFilesChange = (newValue: number) => {
    setMaxFiles({
      type: PropertyType.MAX_FILES,
      value: newValue,
    });
  };

  return (
    <SettingsFieldHorizontal label="Max files" divider>
      <Input
        inputProps={{
          type: 'number',
        }}
        value={maxFiles.value.toString() || ''}
        onChange={(newValue) => {
          handleMaxFilesChange(Number(newValue || ''));
        }}
      />
    </SettingsFieldHorizontal>
  );
}
