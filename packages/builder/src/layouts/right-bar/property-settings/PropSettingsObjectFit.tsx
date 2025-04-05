import { useControllableState } from '../../../lib/hooks/useControllableState';
import { useSchemaStore } from '../../../lib/state/schema.state';
import {
  PropertyType,
  type ObjectFitProperty,
  type FormField,
} from '@efie-form/core';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';
import { Select } from '../../../components/form';

interface PropSettingsObjectFitProps {
  field: FormField;
}

type ObjectFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';

const defaultObjectFit: ObjectFitProperty = {
  type: PropertyType.OBJECT_FIT,
  value: 'fill',
};

const OBJECT_FIT_OPTIONS: Array<{ value: ObjectFit; label: string }> = [
  { value: 'fill', label: 'Fill' },
  { value: 'contain', label: 'Contain' },
  { value: 'cover', label: 'Cover' },
  { value: 'none', label: 'None' },
  { value: 'scale-down', label: 'Scale Down' },
];

export default function PropSettingsObjectFit({
  field,
}: PropSettingsObjectFitProps) {
  const { updateFieldProps } = useSchemaStore();
  const objectFitProp = field.props.find(
    (field) => field.type === PropertyType.OBJECT_FIT
  );
  const [objectFit, setObjectFit] = useControllableState({
    onChange: (value) => {
      updateFieldProps(field.id, PropertyType.OBJECT_FIT, value);
    },
    defaultValue: objectFitProp || defaultObjectFit,
  });

  return (
    <SettingsFieldHorizontal label="Object Fit" divider>
      <Select
        value={objectFit.value}
        onChange={(newValue) => {
          setObjectFit(() => ({
            type: PropertyType.OBJECT_FIT,
            value: newValue as ObjectFit,
          }));
        }}
        options={OBJECT_FIT_OPTIONS}
      />
    </SettingsFieldHorizontal>
  );
}
