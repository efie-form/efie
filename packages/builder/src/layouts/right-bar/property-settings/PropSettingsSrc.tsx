import { useControllableState } from '../../../lib/hooks/useControllableState';
import { useSchemaStore } from '../../../lib/state/schema.state';
import {
  PropertyType,
  type SrcProperty,
  type FormField,
} from '@efie-form/core';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical';
import { Input } from '../../../components/form';
import { DEFAULT_IMAGE_URL } from '../../../lib/constant';

interface PropSettingsSrcProps {
  field: FormField;
}

const defaultSrc: SrcProperty = {
  type: PropertyType.SRC,
  value: '',
};

export default function PropSettingsSrc({ field }: PropSettingsSrcProps) {
  const { updateFieldProps } = useSchemaStore();
  const srcProp = field.props.find(field => field.type === PropertyType.SRC);
  const [src, setSrc] = useControllableState({
    onChange: (value) => {
      updateFieldProps(field.id, PropertyType.SRC, value);
    },
    defaultValue: srcProp || defaultSrc,
  });

  return (
    <SettingsFieldVertical label="Image URL" divider>
      <Input
        value={src.value}
        onChange={(newValue) => {
          setSrc(() => ({
            type: PropertyType.SRC,
            value: newValue,
          }));
        }}
        placeholder={DEFAULT_IMAGE_URL}
      />
    </SettingsFieldVertical>
  );
}
