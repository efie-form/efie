import type {
  FieldKeyPrefix,
  FieldPropsKey,
  FieldPropsValueType,
} from '../../lib/genFieldKey.ts';
import genFieldKey from '../../lib/genFieldKey.ts';
import { useRef, useState } from 'react';
import Switch from '../form/Switch.tsx';
import { Controller, useFormContext } from 'react-hook-form';
import Input from '../form/Input.tsx';
import type { FormSchema } from '@efie-form/core';

interface SplitSides {
  key: FieldPropsKey;
  label: string;
}

interface SettingsField4SidesProps {
  label: string;
  divider?: boolean;
  allSideLabel: string;
  splitSides: SplitSides[];
  fieldKey: FieldKeyPrefix;
}

function SettingsField4Sides({
  label,
  divider,
  splitSides,
  allSideLabel,
  fieldKey,
}: SettingsField4SidesProps) {
  const { setValue, getValues } = useFormContext<FormSchema>();
  const isAllEqual = splitSides.every((item) => {
    return (
      getValues(genFieldKey(fieldKey, item.key)) ===
      getValues(genFieldKey(fieldKey, splitSides[0].key))
    );
  });
  const [isSplitSides, setIsSplitSides] = useState(!isAllEqual);
  const prev4SidesRef = useRef<FieldPropsValueType[]>([]);
  const prevAllSideRef = useRef<FieldPropsValueType>(
    getValues(genFieldKey(fieldKey, splitSides[0].key))
  );

  const handleSetAllPadding = (size: FieldPropsValueType) => {
    splitSides.forEach((item) => {
      setValue(genFieldKey(fieldKey, item.key), size);
    });
  };

  const handleToggleCustomPadding = () => {
    setIsSplitSides((prev) => !prev);

    if (isSplitSides && !isAllEqual) {
      splitSides.forEach((item) => {
        const value = getValues(genFieldKey(fieldKey, item.key));
        return prev4SidesRef.current.push(value);
      });
      handleSetAllPadding(prevAllSideRef.current);
    }

    if (!isSplitSides) {
      prevAllSideRef.current = getValues(
        genFieldKey(fieldKey, splitSides[0].key)
      );
    }

    if (!isSplitSides && prev4SidesRef.current.length > 0) {
      splitSides.forEach((item, index) => {
        setValue(genFieldKey(fieldKey, item.key), prev4SidesRef.current[index]);
      });
      prev4SidesRef.current = [];
    }
  };

  return (
    <div>
      <div className="px-4 py-3.5">
        <div className="flex justify-between items-center">
          <div>
            <p className="typography-body3 text-neutral-800">{label}</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="typography-body4 text-neutral-800">More Options</p>
            <Switch
              checked={isSplitSides}
              onChange={handleToggleCustomPadding}
            />
          </div>
        </div>
        <div className="mt-5">
          {isSplitSides && (
            <div className="grid grid-cols-2 gap-x-2 gap-y-4">
              {splitSides.map((item) => (
                <div key={item.key} className="">
                  <p className="typography-body3 text-neutral-700 mb-2">
                    {item.label}
                  </p>
                  <Controller
                    key={genFieldKey(fieldKey, item.key)}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        value={value}
                        onChange={(newValue) => {
                          onChange(parseInt(newValue, 10));
                        }}
                        suffix="px"
                        suffixType="text"
                        inputProps={{
                          type: 'number',
                          min: 0,
                        }}
                      />
                    )}
                    name={genFieldKey(fieldKey, item.key)}
                  />
                </div>
              ))}
            </div>
          )}
          {!isSplitSides && (
            <div>
              <p className="typography-body3 text-neutral-700 mb-2">
                {allSideLabel}
              </p>
              <Controller
                key={genFieldKey(fieldKey, splitSides[0].key)}
                render={({ field: { value } }) => (
                  <Input
                    value={value}
                    onChange={(newValue) => {
                      handleSetAllPadding(parseInt(newValue, 10));
                    }}
                    className="w-24"
                    suffix="px"
                    suffixType="text"
                    inputProps={{
                      type: 'number',
                      min: 0,
                    }}
                  />
                )}
                name={genFieldKey(fieldKey, splitSides[0].key)}
              />
            </div>
          )}
        </div>
      </div>

      {divider && (
        <div className="mx-4">
          <div className="w-full border-t-[0.5px] border-neutral-400 h-[1px]" />
        </div>
      )}
    </div>
  );
}

export default SettingsField4Sides;
