import { useControllableState } from '../../../lib/hooks/useControllableState';
import { useSchemaStore } from '../../../lib/state/schema.state';
import {
  PropertyType,
  FormFieldType,
  type OptionTypeProperty,
  type FormField,
} from '@efie-form/core';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';
import { Select } from '../../../components/form';

interface PropSettingsOptionTypeProps {
  field: FormField;
  defaultType?: 'radio' | 'checkbox';
}

type OptionDisplayType = 'radio' | 'checkbox' | 'dropdown';
type OptionDirection = 'horizontal' | 'vertical';

const defaultOptionType: OptionTypeProperty = {
  type: PropertyType.OPTION_TYPE,
  displayType: 'radio' as OptionDisplayType,
  direction: 'vertical' as OptionDirection,
};

const DISPLAY_TYPE_OPTIONS = [
  { value: 'radio', label: 'Radio' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'dropdown', label: 'Dropdown' },
];

const DIRECTION_OPTIONS = [
  { value: 'vertical', label: 'Vertical' },
  { value: 'horizontal', label: 'Horizontal' },
];

export default function PropSettingsOptionType({ field, defaultType }: PropSettingsOptionTypeProps) {
  const { updateFieldProps } = useSchemaStore();
  const optionTypeProp = field.props.find(
    field => field.type === PropertyType.OPTION_TYPE,
  );

  // Determine the default display type based on the field type or the provided defaultType
  const determineDefaultType = (): OptionDisplayType => {
    if (defaultType) return defaultType;
    // If no default type is provided, infer from the field type
    return field.type === FormFieldType.MULTIPLE_CHOICES ? 'checkbox' : 'radio';
  };

  const [optionType, setOptionType] = useControllableState({
    onChange: (value) => {
      updateFieldProps(field.id, PropertyType.OPTION_TYPE, value);
    },
    defaultValue: optionTypeProp || {
      ...defaultOptionType,
      displayType: determineDefaultType(),
    },
  });

  const showDirection = optionType.displayType !== 'dropdown';

  return (
    <>
      <SettingsFieldHorizontal label="Display As" divider={!showDirection}>
        <Select
          value={optionType.displayType}
          onChange={(newValue) => {
            setOptionType(prev => ({
              ...prev,
              displayType: newValue as OptionDisplayType,
              direction: prev.direction || 'vertical',
            }));
          }}
          options={DISPLAY_TYPE_OPTIONS}
        />
      </SettingsFieldHorizontal>

      {showDirection && (
        <SettingsFieldHorizontal label="Direction" divider>
          <Select
            value={optionType.direction}
            onChange={(newValue) => {
              setOptionType(prev => ({
                ...prev,
                direction: newValue as OptionDirection,
              }));
            }}
            options={DIRECTION_OPTIONS}
          />
        </SettingsFieldHorizontal>
      )}
    </>
  );
}
