import type { FormSchema, OptionType } from '@efie-form/core';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { MdOutlineClose, MdOutlineDragIndicator } from 'react-icons/md';
import type { FieldKeyPrefix } from '../../lib/genFieldKey.ts';
import genFieldKey from '../../lib/genFieldKey.ts';
import { useRef } from 'react';

interface ChoiceFieldBaseProps {
  fieldId: string;
  fieldKey: FieldKeyPrefix;
  inputType: 'radio' | 'checkbox';
  isValueDifferent?: boolean;
}

function ChoiceFieldBase({
  fieldId,
  fieldKey,
  inputType,
  isValueDifferent,
}: ChoiceFieldBaseProps) {
  const { register } = useFormContext<FormSchema>();
  const fieldArray = useFieldArray({
    name: `${fieldKey}.props.options`,
  });
  const { append, update, remove } = fieldArray;
  const options = fieldArray.fields as (OptionType & { id: string })[];
  const lastInputRef = useRef<HTMLInputElement>(null);

  const handleNewOption = () => {
    const name = `Option ${options.length + 1}`;
    append({
      value: name,
      label: name,
    });
    requestAnimationFrame(() => {
      lastInputRef.current?.focus();
    });
  };

  return (
    <div className="p-2">
      <input
        {...register(genFieldKey(fieldKey, 'props.label'))}
        className="mb-2 typography-body2 bg-white bg-opacity-0 focus:outline-none cursor-text w-full"
        type="text"
      />
      <div
        id={`${fieldId}-options-container`}
        className="flex flex-col gap-2 px-2"
      >
        {options.map((option, index) => (
          <div
            className="flex items-center gap-2 group relative"
            key={`${fieldId}-${index}`}
          >
            <div className="invisible group-hover:visible absolute left-0 top-1/2 -translate-x-full -translate-y-1/2">
              <MdOutlineDragIndicator className="text-neutral-500 cursor-grab" />
            </div>
            <input type={inputType} name={`${fieldId}-option`} />
            <div className="flex-1">
              <input
                type="text"
                className="typography-body3 focus:outline-none text-neutral-800 w-full"
                value={option.label}
                ref={index === options.length - 1 ? lastInputRef : undefined}
                onFocus={(e) => {
                  e.currentTarget.select();
                }}
                onChange={(e) => {
                  const newValue = {
                    ...option,
                    label: e.target.value,
                  };

                  if (isValueDifferent && option.value === option.label) {
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
        <input type={inputType} disabled />
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

export default ChoiceFieldBase;
