import type { FormFieldMultipleChoices, OptionType } from '@efie-form/core';
import { Controller, useFieldArray } from 'react-hook-form';
import useFieldInfo from '../../lib/hooks/useFieldInfo.ts';
import { MdOutlineClose, MdOutlineDragIndicator } from 'react-icons/md';
import type { FieldKeyPrefix } from '../../lib/genFieldKey.ts';

interface MultipleChoicesProps {
  field: FormFieldMultipleChoices;
  fieldKey: FieldKeyPrefix;
}

function MultipleChoicesField({ field }: MultipleChoicesProps) {
  const fieldInfo = useFieldInfo({
    fieldId: field.id,
  });
  const fieldArray = useFieldArray({
    name: `${fieldInfo?.key || ''}.props.options`,
  });
  const { append, update, remove } = fieldArray;
  const options = fieldArray.fields as (OptionType & { id: string })[];

  if (!fieldInfo) return null;

  const handleNewOption = () => {
    append({
      value: `Option ${options.length + 1}`,
      label: `Option ${options.length + 1}`,
    });
    setTimeout(() => {
      const newOption = document.querySelector(
        `#${field.id}-options-container > div:last-child input[type="text"]`
      );
      if (!(newOption instanceof HTMLInputElement)) return;

      newOption?.focus();
    }, 0);
  };

  return (
    <div className="p-2">
      <Controller
        render={({ field: { value, onChange } }) => (
          <input
            className="mb-2 typography-body2 text-neutral-800 focus:outline-none cursor-text w-full"
            type="text"
            value={value}
            onChange={onChange}
          />
        )}
        name={`${fieldInfo.key}.props.label`}
      />
      <div
        id={`${field.id}-options-container`}
        className="flex flex-col gap-2 px-2"
      >
        {options.map((option, index) => (
          <div
            className="flex items-center gap-2 group relative"
            key={`${field.id}-${index}`}
          >
            <div className="invisible group-hover:visible absolute left-0 top-1/2 -translate-x-full -translate-y-1/2">
              <MdOutlineDragIndicator className="text-neutral-500 cursor-grab" />
            </div>
            <input type="checkbox" name={`${field.id}-option`} />
            <div className="flex-1">
              <input
                type="text"
                className="typography-body3 focus:outline-none text-neutral-800 w-full"
                value={option.label}
                onFocus={(e) => {
                  e.currentTarget.select();
                }}
                onChange={(e) => {
                  const newValue = {
                    ...option,
                    label: e.target.value,
                  };

                  if (
                    field.props.isValueDifferent &&
                    option.value === option.label
                  ) {
                    newValue.value = e.target.value;
                  }

                  update(index, newValue);
                }}
              />
              <div className="border-t border-neutral-200 invisible group-hover:visible group-focus-within:visible group-focus-within:border-neutral-500" />
            </div>
            <button
              onClick={() => {
                remove(index);
              }}
            >
              <MdOutlineClose className="text-neutral-500 cursor-pointer hover:text-neutral-700" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 px-2 mt-2">
        <input type="checkbox" disabled />
        <p
          className="typography-body3 text-neutral-400 cursor-text hover:text-neutral-500"
          onClick={handleNewOption}
        >
          Add option
        </p>
      </div>
    </div>
  );
}

export default MultipleChoicesField;
