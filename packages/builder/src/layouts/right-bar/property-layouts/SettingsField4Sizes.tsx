import { type SizeUnit } from '@efie-form/core';
import { Switch } from '../../../components/form';
import { Input } from '../../../components/form';
import { useControllableState } from '../../../lib/hooks/useControllableState';
import { useRef, useState } from 'react';

interface Size<T extends string> {
  key: T;
  label: string;
  value: number;
  unit: SizeUnit;
}

interface SettingsField4SizesProps<T extends string> {
  label: string;
  allSizeLabel?: string;
  sizes: Size<T>[];
  onChange: (value: Record<T, { value: number; unit: SizeUnit }>) => void;
}

function getDefaultValue<T extends string>(sizes: Size<T>[]) {
  const value = {} as Record<T, { value: number; unit: SizeUnit }>;
  for (const size of sizes) {
    value[size.key] = { value: size.value, unit: size.unit };
  }
  return value;
}

const isAllEqual = <T extends string>(sizes: Size<T>[]) => {
  return sizes.every(size => size.value === sizes[0].value);
};

export default function SettingsField4Sizes<T extends string>({
  label,
  allSizeLabel,
  sizes,
  onChange,
}: SettingsField4SizesProps<T>) {
  const defaultSize = getDefaultValue(sizes);
  const [isSplitSides, setIsSplitSides] = useState(!isAllEqual(sizes));
  const [value, setValue] = useControllableState({
    defaultValue: defaultSize,
    onChange: (value) => {
      onChange(value);
    },
  });
  const prev4SidesRef
    = useRef<Record<T, { value: number; unit: SizeUnit }>>(defaultSize);
  const prevAllSideRef = useRef<{ value: number; unit: SizeUnit }>();

  const handleToggleCustomPadding = () => {
    setIsSplitSides(prev => !prev);

    if (isSplitSides && !isAllEqual(sizes)) {
      // to change from split to all equal

      // save the size if need to revert
      prev4SidesRef.current = value;

      // set all sizes to the value of first item
      const firstSize = {
        value: value[sizes[0].key].value,
        unit: value[sizes[0].key].unit,
      };
      // if there is a saved size, use it, otherwise use the first item
      changeAllSize(prevAllSideRef.current || firstSize);
    }

    if (!isSplitSides) {
      // to change from all equal to split

      // save the value of first item for later revert
      prevAllSideRef.current = value[sizes[0].key];
    }

    if (!isSplitSides && Object.keys(prev4SidesRef.current).length > 0) {
      // to change from all equal to split, and there are saved sizes

      // revert to the saved sizes
      setValue(prev4SidesRef.current);
    }
  };

  const changeAllSize = (value: { value: number; unit: SizeUnit }) => {
    const newSizes = {} as Record<T, { value: number; unit: SizeUnit }>;
    for (const size of sizes) {
      newSizes[size.key] = value;
    }
    setValue(newSizes);
  };

  const handleChangeSize = (key: T, value: number) => {
    setValue(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        value,
      },
    }));
  };

  //   const handleChangeUnit = (key: T, unit: SizeUnit) => {
  //     setValue((prev) => ({
  //       ...prev,
  //       [key]: { ...prev[key], unit },
  //     }));
  //   };

  const handleChangeAllSize = (size: number) => {
    changeAllSize({ value: size, unit: value[sizes[0].key].unit });
  };

  //   const handleChangeAllUnit = (unit: SizeUnit) => {
  //     changeAllSize({ value: value[sizes[0].key].value, unit });
  //   };

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
              {sizes.map(item => (
                <div key={item.key} className="">
                  <p className="typography-body3 text-neutral-700 mb-2">
                    {item.label}
                  </p>
                  <Input
                    value={value[item.key].value.toString()}
                    onChange={(newValue) => {
                      handleChangeSize(item.key, Number(newValue));
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
              {allSizeLabel && (
                <p className="typography-body3 text-neutral-700 mb-2">
                  {allSizeLabel}
                </p>
              )}
              <Input
                value={value[sizes[0].key].value.toString()}
                onChange={(newValue) => {
                  handleChangeAllSize(Number(newValue));
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

      <div className="mx-4">
        <div className="w-full border-t-[0.5px] border-neutral-400 h-[1px]" />
      </div>
    </div>
  );
}
