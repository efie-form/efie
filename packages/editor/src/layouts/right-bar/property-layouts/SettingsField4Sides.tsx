import type {
  FieldPropsKey,
  FieldPropsValueType,
} from '../../../lib/genFieldKey.ts';
import { useRef, useState } from 'react';
import Switch from '../../../components/form/Switch.tsx';
import Input from '../../../components/form/Input.tsx';
import type { FormField } from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state.ts';
import { cn } from '../../../lib/utils.ts';

interface SplitSides {
  key: FieldPropsKey;
  label: string;
}

interface SettingsField4SidesProps {
  label: string;
  divider?: boolean;
  allSideLabel: string;
  splitSides: SplitSides[];
  field: FormField;
  noPadding?: boolean;
  className?: string;
}

function SettingsField4Sides({
  label,
  divider,
  splitSides,
  allSideLabel,
  field,
  noPadding,
  className,
}: SettingsField4SidesProps) {
  const { getFieldKeyById, updateFieldProps, getFieldProps } = useSchemaStore();
  const fieldKey = getFieldKeyById(field.id);

  const isAllEqual = splitSides.every((item) => {
    return (
      getFieldProps(field.id, item.key) ===
      getFieldProps(field.id, splitSides[0].key)
    );
  });
  const [isSplitSides, setIsSplitSides] = useState(!isAllEqual);
  const prev4SidesRef = useRef<FieldPropsValueType[]>([]);
  const prevAllSideRef = useRef<FieldPropsValueType>(
    getFieldProps(field.id, splitSides[0].key)
  );

  const handleSetAllPadding = (size: FieldPropsValueType) => {
    splitSides.forEach((item) => {
      updateFieldProps(field.id, item.key, size);
    });
  };

  const handleToggleCustomPadding = () => {
    setIsSplitSides((prev) => !prev);

    if (isSplitSides && !isAllEqual) {
      splitSides.forEach((item) => {
        const value = getFieldProps(field.id, item.key);
        return prev4SidesRef.current.push(value);
      });
      handleSetAllPadding(prevAllSideRef.current);
    }

    if (!isSplitSides) {
      prevAllSideRef.current = getFieldProps(field.id, splitSides[0].key);
    }

    if (!isSplitSides && prev4SidesRef.current.length > 0) {
      splitSides.forEach((item, index) => {
        updateFieldProps(field.id, item.key, prev4SidesRef.current[index]);
      });
      prev4SidesRef.current = [];
    }
  };

  if (!fieldKey) return null;

  return (
    <div className={className}>
      <div
        className={cn({
          'px-4 py-3.5': !noPadding,
        })}
      >
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
                  <Input
                    value={getFieldProps(field.id, item.key) as string}
                    onChange={(newValue) => {
                      updateFieldProps(field.id, item.key, Number(newValue));
                    }}
                    className="w-24"
                    suffix="px"
                    suffixType="text"
                    inputProps={{
                      type: 'number',
                      min: 0,
                    }}
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
              <Input
                value={getFieldProps(field.id, splitSides[0].key) as string}
                onChange={(newValue) => {
                  handleSetAllPadding(Number(newValue));
                }}
                className="w-24"
                suffix="px"
                suffixType="text"
                inputProps={{
                  type: 'number',
                  min: 0,
                }}
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
