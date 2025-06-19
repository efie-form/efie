import { useCallback, useState, useRef, useEffect } from 'react';
import { useSchemaStore } from '../../../lib/state/schema.state';
import type { PropSettingsBorderRadius } from '../../../types/prop-settings.type';
import { borderRadiusToStyle, isBorderRadiusValue, SizeType, type BorderRadius, type BorderRadiusProperty, type PropertyDefinition, type PropValue, type PropValueBorderRadius, type Size } from '@efie-form/core';
import SizeInput from '../../../components/form/size-input';
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
  const value = getValue(fieldProperty?.value);
  const [isLinked, setIsLink] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const previousValuesRef = useRef<BorderRadiusProperty['value'] | null>(null);

  // Helper function to check if all corner values are the same
  const areAllCornersSame = useCallback((borderValue: BorderRadiusProperty['value']): boolean => {
    const { topLeft, topRight, bottomLeft, bottomRight } = borderValue;

    // Helper to normalize values for comparison
    const normalizeValue = (val: BorderRadius): string => {
      if (Array.isArray(val)) {
        return JSON.stringify(val);
      }
      return JSON.stringify(val);
    };

    const topLeftStr = normalizeValue(topLeft);
    const topRightStr = normalizeValue(topRight);
    const bottomLeftStr = normalizeValue(bottomLeft);
    const bottomRightStr = normalizeValue(bottomRight);

    return topLeftStr === topRightStr
      && topRightStr === bottomLeftStr
      && bottomLeftStr === bottomRightStr;
  }, []);

  // Check if all corners are the same when component mounts or value changes
  useEffect(() => {
    const allSame = areAllCornersSame(value);
    // Only auto-link if currently unlinked, all corners are the same, AND user hasn't manually interacted
    if (allSame && !isLinked && !hasUserInteracted) {
      setIsLink(true);
    }
    // Don't auto-unlink if values become different - let user control this
  }, [value, areAllCornersSame, isLinked, hasUserInteracted]);

  const toggleLink = () => {
    // Mark that user has manually interacted with the link state
    setHasUserInteracted(true);

    if (isLinked) {
      // Restore previous values when unlinking
      if (previousValuesRef.current) {
        updateFieldProperty(fieldId, {
          type,
          value: previousValuesRef.current,
        } as PropertyDefinition);
      }
    }
    else {
      // Store current values before linking (only if they're not already the same)
      if (!areAllCornersSame(value)) {
        previousValuesRef.current = { ...value };
      }
      // Set all corners to the same value (using topLeft as reference)
      const uniformValue = value.topLeft;
      updateFieldProperty(fieldId, {
        type,
        value: {
          topLeft: uniformValue,
          topRight: uniformValue,
          bottomLeft: uniformValue,
          bottomRight: uniformValue,
        },
      } as PropertyDefinition);
    }
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

  const handleLinkedChange = useCallback((newValue: Size) => {
    updateFieldProperty(fieldId, {
      type,
      value: {
        topLeft: newValue,
        topRight: newValue,
        bottomLeft: newValue,
        bottomRight: newValue,
      },
    } as PropertyDefinition);
  }, [fieldId, updateFieldProperty, type]);

  // Get the first value for linked mode (assuming all corners have the same value when linked)
  const getLinkedValue = (): Size => {
    const topLeft = value.topLeft;
    if (Array.isArray(topLeft)) {
      return topLeft[0] || { type: SizeType.LENGTH, value: 0, unit: 'px' };
    }
    return topLeft;
  };

  return (
    <>
      <div className="px-4 py-3.5">
        <div className="mb-4 flex justify-between items-center">
          <p className="typography-body3 text-neutral-800">{label}</p>
          <div>
            <button onClick={toggleLink} className="flex items-center gap-2 text-neutral-600">
              {isLinked ? <FaLink /> : <FaUnlink />}
            </button>
          </div>
        </div>
        <div className="flex gap-4">
          {isLinked
            ? (
                <div className="flex gap-4 items-start justify-between w-full">
                  <div className="flex flex-col gap-2">
                    <p className="typography-body4 text-neutral-600">All corners</p>
                    <SizeInput
                      value={getLinkedValue()}
                      onChange={handleLinkedChange}
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <div
                      className="border-2 border-neutral-400 aspect-square w-16 h-16"
                      style={{
                        borderRadius: borderRadiusToStyle(value),
                      }}
                    >
                    </div>
                  </div>
                </div>
              )
            : (
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
              )}
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

function getValue(props?: PropValue): PropValueBorderRadius {
  if (!isBorderRadiusValue(props)) return {
    topLeft: { type: SizeType.LENGTH, value: 0, unit: 'px' },
    topRight: { type: SizeType.LENGTH, value: 0, unit: 'px' },
    bottomLeft: { type: SizeType.LENGTH, value: 0, unit: 'px' },
    bottomRight: { type: SizeType.LENGTH, value: 0, unit: 'px' },
  };

  return props;
}
