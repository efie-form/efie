import { useCallback, useState } from 'react';
import { useSchemaStore } from '../../../lib/state/schema.state';
import type { PropSettingsBorderRadius } from '../../../types/prop-settings.type';
import { borderRadiusToStyle, isBorderRadiusValue, SizeType, type BorderRadius, type BorderRadiusProperty, type PropertyDefinition, type Size } from '@efie-form/core';
import SizeInput from '../../../components/form/SizeInput';
import { FaLink, FaUnlink } from 'react-icons/fa';

interface PropsSettingsBorderRadiusProps extends PropSettingsBorderRadius {
  fieldId: string;
}

export default function PropsSettingsBorderRadius({ fieldId, label, type }: PropsSettingsBorderRadiusProps) {
  const fieldProperty = useSchemaStore(useCallback(
    state => (state.getFieldProperty(fieldId, type)),
    [fieldId, type],
  ));
  const updateFieldProperty = useSchemaStore(state => state.updateFieldProperty);
  const value = getValue(fieldProperty);
  const [isLinked, setIsLink] = useState(false);

  const toggleLink = () => {
    setIsLink(!isLinked);
  };

  const handleChange = useCallback((newValue: BorderRadius, borderType: keyof BorderRadiusProperty['value']) => {
    updateFieldProperty(fieldId, {
      type,
      value: {
        ...value,
        [borderType]: newValue,
      },
    } as PropertyDefinition);
  }, [fieldId, updateFieldProperty, type, value]);

  return (
    <>
      <div className="px-4 py-3.5">
        <div className="mb-2 flex justify-between items-center">
          <p className="typography-body3 text-neutral-800">{label}</p>
          <div>
            <button onClick={toggleLink} className="flex items-center gap-2 text-neutral-600">
              {isLinked ? <FaLink /> : <FaUnlink />}
            </button>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="grid grid-cols-3">
            <div>
              <p className="typography-body4 text-neutral-600">Top left</p>
              <BorderCorner
                value={value}
                handleChange={handleChange}
                borderType="topLeft"
              />
            </div>
            <div />
            <div>
              <p className="typography-body4 text-neutral-600">Top right</p>
              <BorderCorner
                value={value}
                handleChange={handleChange}
                borderType="topRight"
              />
            </div>
            <div />
            <div className="flex items-center justify-center">
              <div
                className="border-2 border-neutral-400 aspect-square w-1/2"
                style={{
                  borderRadius: borderRadiusToStyle(value),
                }}
              >
              </div>
            </div>
            <div />
            <div>
              <p className="typography-body4 text-neutral-600">Bottom left</p>
              <BorderCorner
                value={value}
                handleChange={handleChange}
                borderType="bottomLeft"
              />
            </div>
            <div />
            <div>
              <p className="typography-body4 text-neutral-600">Bottom right</p>
              <BorderCorner
                value={value}
                handleChange={handleChange}
                borderType="bottomRight"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-4">
        <div className="w-full border-t-[0.5px] border-neutral-400 h-[1px]" />
      </div>
    </>
  );
}

interface BorderCornerProps {
  value: BorderRadiusProperty['value'];
  handleChange: (newValue: BorderRadius, borderType: keyof BorderRadiusProperty['value']) => void;
  borderType: keyof BorderRadiusProperty['value'];
}

function BorderCorner({ value, handleChange, borderType }: BorderCornerProps) {
  function handleInternalChange(newSize: Size, borderType: keyof BorderRadiusProperty['value'], index: number) {
    const cornerSize = value[borderType];
    if (Array.isArray(cornerSize)) {
      const newSizeArray = [...cornerSize];
      newSizeArray[index] = newSize;
      handleChange(newSizeArray, borderType);
    }
    else {
      handleChange(newSize, borderType);
    }
  }

  return (
    <>
      {Array.isArray(value[borderType])
        ? (
            <>
              {value[borderType].map((size, index) => (
                <SizeInput
                  key={index}
                  className="w-full"
                  value={size}
                  onChange={newSize => handleInternalChange(newSize, borderType, index)}
                />
              ))}
            </>
          )
        : (
            <SizeInput
              className="w-full"
              value={value[borderType]}
              onChange={newSize => handleInternalChange(newSize, borderType, 0)}
            />
          )}
    </>
  );
}

function getValue(props?: PropertyDefinition): BorderRadiusProperty['value'] {
  if (!isBorderRadiusValue(props)) return {
    topLeft: { type: SizeType.LENGTH, value: 0, unit: 'px' },
    topRight: { type: SizeType.LENGTH, value: 0, unit: 'px' },
    bottomLeft: { type: SizeType.LENGTH, value: 0, unit: 'px' },
    bottomRight: { type: SizeType.LENGTH, value: 0, unit: 'px' },
  };

  return props.value;
}
