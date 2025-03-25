import {
  PropertyType,
  type FormField,
  type OptionsProperty,
} from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { useControllableState } from '../../../lib/hooks/useControllableState';
import { Input, Switch } from '../../../components/form';
import { useRef, useState } from 'react';

interface PropSettingsOptionProps {
  field: FormField;
}

const defaultOption: OptionsProperty = {
  type: PropertyType.OPTIONS,
  value: [
    {
      label: 'Option 1',
      value: 'Option 1',
    },
    {
      label: 'Option 2',
      value: 'Option 2',
    },
    {
      label: 'Option 3',
      value: 'Option 3',
    },
  ],
  errorMessage: '',
};

export default function PropSettingsOption({ field }: PropSettingsOptionProps) {
  const { updateFieldProps, getFieldProps } = useSchemaStore();
  const optionsProp = getFieldProps(field.id, PropertyType.OPTIONS);
  const [isValueDifferent, setIsValueDifferent] = useState(
    optionsProp?.value?.some((option) => option.value !== option.label) || false
  );
  const [options, setOptions] = useControllableState({
    onChange: (value) => {
      updateFieldProps(field.id, PropertyType.OPTIONS, value);
    },
    defaultValue: optionsProp || defaultOption,
  });
  const prevOptionsRef = useRef<OptionsProperty['value']>();

  const handleChangeDifferentValue = (value: boolean) => {
    setIsValueDifferent(value);
    if (value) {
      setOptions((prev) => ({
        ...prev,
        value: prev.value.map((option, index) => ({
          ...option,
          value:
            prevOptionsRef.current?.find((_, i) => i === index)?.value ||
            option.value,
        })),
      }));
    } else {
      prevOptionsRef.current = options.value;

      setOptions((prev) => ({
        ...prev,
        value: prev.value.map((option) => ({
          ...option,
          value: option.label,
        })),
      }));
    }
  };

  const handleLabelChange = (index: number, value: string) => {
    const newOptions = [...options.value];
    newOptions[index].label = value;
    if (!isValueDifferent) {
      newOptions[index].value = value;
    }
    setOptions({ ...options, value: newOptions });
  };

  const handleValueChange = (index: number, value: string) => {
    const newOptions = [...options.value];
    newOptions[index].value = value;
    setOptions({ ...options, value: newOptions });
  };

  return (
    <>
      <div className="px-4 py-3.5">
        <div className="mb-2 flex justify-between items-center">
          <p className="typography-body3 text-neutral-800">Options</p>
          <div className="flex items-center gap-2">
            <p className="typography-body3 text-neutral-800">Different Value</p>
            <Switch
              checked={isValueDifferent}
              onChange={handleChangeDifferentValue}
            />
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-2">
            {options.value.map((option, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={option.label}
                  onChange={(value) => handleLabelChange(index, value)}
                />
                {isValueDifferent && (
                  <Input
                    value={option.value}
                    onChange={(value) => handleValueChange(index, value)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-4">
        <div className="w-full border-t-[0.5px] border-neutral-400 h-[1px]" />
      </div>
    </>
  );
}
