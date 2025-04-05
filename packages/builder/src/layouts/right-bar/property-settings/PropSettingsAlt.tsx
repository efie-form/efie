import { useControllableState } from '../../../lib/hooks/useControllableState';
import { useSchemaStore } from '../../../lib/state/schema.state';
import {
  PropertyType,
  type AltProperty,
  type FormField,
} from '@efie-form/core';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical';
import { Input } from '../../../components/form';

interface PropSettingsAltProps {
  field: FormField;
}

const defaultAlt: AltProperty = {
  type: PropertyType.ALT,
  value: '',
};

export default function PropSettingsAlt({ field }: PropSettingsAltProps) {
  const { updateFieldProps } = useSchemaStore();
  const altProp = field.props.find((field) => field.type === PropertyType.ALT);
  const [alt, setAlt] = useControllableState({
    onChange: (value) => {
      updateFieldProps(field.id, PropertyType.ALT, value);
    },
    defaultValue: altProp || defaultAlt,
  });

  return (
    <SettingsFieldVertical label="Alt Text" divider>
      <Input
        value={alt.value}
        onChange={(newValue) => {
          setAlt(() => ({
            type: PropertyType.ALT,
            value: newValue,
          }));
        }}
        placeholder="Describe the image for accessibility"
      />
      <p className="typography-body4 text-neutral-500 mt-1">
        Provide descriptive text for users who can't see the image
      </p>
    </SettingsFieldVertical>
  );
}
