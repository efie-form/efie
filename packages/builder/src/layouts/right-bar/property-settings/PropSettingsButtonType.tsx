import { useControllableState } from '../../../lib/hooks/useControllableState';
import { useSchemaStore } from '../../../lib/state/schema.state';
import {
  PropertyType,
  type ButtonTypeProperty,
  type FormField,
} from '@efie-form/core';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';
import { Select } from '../../../components/form';

interface PropSettingsButtonTypeProps {
  field: FormField;
}

type ButtonType = 'submit' | 'button';

const defaultButtonType: ButtonTypeProperty = {
  type: PropertyType.BTN_TYPE,
  value: 'button',
};

const BUTTON_TYPE_OPTIONS: Array<{ value: ButtonType; label: string }> = [
  { value: 'button', label: 'Button' },
  { value: 'submit', label: 'Submit' },
];

export default function PropSettingsButtonType({
  field,
}: PropSettingsButtonTypeProps) {
  const { updateFieldProps } = useSchemaStore();
  const buttonTypeProp = field.props.find(
    field => field.type === PropertyType.BTN_TYPE,
  );
  const [buttonType, setButtonType] = useControllableState({
    onChange: (value) => {
      updateFieldProps(field.id, PropertyType.BTN_TYPE, value);
    },
    defaultValue: buttonTypeProp || defaultButtonType,
  });

  return (
    <SettingsFieldHorizontal label="Button Type" divider>
      <Select
        value={buttonType.value}
        onChange={(newValue) => {
          setButtonType(() => ({
            type: PropertyType.BTN_TYPE,
            value: newValue as ButtonType,
          }));
        }}
        options={BUTTON_TYPE_OPTIONS}
      />
    </SettingsFieldHorizontal>
  );
}
