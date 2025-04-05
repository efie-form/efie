import { useControllableState } from '../../../lib/hooks/useControllableState';
import { useSchemaStore } from '../../../lib/state/schema.state';
import {
  PropertyType,
  type TagProperty,
  type FormField,
} from '@efie-form/core';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';
import { Select } from '../../../components/form';

interface PropSettingsTagProps {
  field: FormField;
}

const defaultTag: TagProperty = {
  type: PropertyType.TAG,
  value: 'h1',
};

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const TAG_OPTIONS: Array<{ value: HeadingTag; label: string }> = [
  { value: 'h1', label: 'H1' },
  { value: 'h2', label: 'H2' },
  { value: 'h3', label: 'H3' },
  { value: 'h4', label: 'H4' },
  { value: 'h5', label: 'H5' },
  { value: 'h6', label: 'H6' },
];

export default function PropSettingsTag({ field }: PropSettingsTagProps) {
  const { updateFieldProps } = useSchemaStore();
  const tagProp = field.props.find((field) => field.type === PropertyType.TAG);
  const [tag, setTag] = useControllableState({
    onChange: (value) => {
      updateFieldProps(field.id, PropertyType.TAG, value);
    },
    defaultValue: tagProp || defaultTag,
  });

  return (
    <SettingsFieldHorizontal label="Tag" divider>
      <Select
        value={tag.value}
        onChange={(newValue) => {
          setTag(() => ({
            type: PropertyType.TAG,
            value: newValue as HeadingTag,
          }));
        }}
        options={TAG_OPTIONS}
      />
    </SettingsFieldHorizontal>
  );
}
