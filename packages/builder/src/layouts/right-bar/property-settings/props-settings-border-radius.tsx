import {
  type BorderRadius,
  type BorderRadiusProperty,
  borderRadiusToStyle,
  type PropValueBorderRadius,
  type Size,
  SizeType,
} from '@efie-form/core';
import { useEffect, useRef, useState } from 'react';
import { FaLink, FaUnlink } from 'react-icons/fa';
import SizeInput from '../../../components/form/size-input';

interface PropsSettingsBorderRadiusProps {
  value: PropValueBorderRadius;
  onChange: (newValue: PropValueBorderRadius) => void;
  label: string;
}

// Helper to normalize values for comparison
const normalizeValue = (val: BorderRadius): string => {
  if (Array.isArray(val)) {
    return JSON.stringify(val);
  }
  if (typeof val === 'object' && val !== null) {
    return JSON.stringify(val);
  }
  return String(val);
};

export default function PropsSettingsBorderRadius({
  label,
  onChange,
  value,
}: PropsSettingsBorderRadiusProps) {
  const [isLinked, setIsLink] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const previousValuesRef = useRef<BorderRadiusProperty['value'] | null>(null);

  // Helper function to check if all corner values are the same
  const areAllCornersSame = (borderValue: BorderRadiusProperty['value']): boolean => {
    const { topLeft, topRight, bottomLeft, bottomRight } = borderValue;

    const topLeftStr = normalizeValue(topLeft);
    const topRightStr = normalizeValue(topRight);
    const bottomLeftStr = normalizeValue(bottomLeft);
    const bottomRightStr = normalizeValue(bottomRight);

    return (
      topLeftStr === topRightStr &&
      topRightStr === bottomLeftStr &&
      bottomLeftStr === bottomRightStr
    );
  };

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
        onChange(previousValuesRef.current);
      }
    } else {
      // Store current values before linking (only if they're not already the same)
      if (!areAllCornersSame(value)) {
        previousValuesRef.current = { ...value };
      }
      // Set all corners to the same value (using topLeft as reference)
      const uniformValue = value.topLeft;
      onChange({
        topLeft: uniformValue,
        topRight: uniformValue,
        bottomLeft: uniformValue,
        bottomRight: uniformValue,
      });
    }
    setIsLink(!isLinked);
  };

  const handleChange = (
    newValue: BorderRadius,
    borderType: keyof BorderRadiusProperty['value'],
  ) => {
    onChange({
      ...value,
      [borderType]: newValue,
    });
  };

  const handleLinkedChange = (newValue: Size) => {
    onChange({
      topLeft: newValue,
      topRight: newValue,
      bottomLeft: newValue,
      bottomRight: newValue,
    });
  };

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
          {isLinked ? (
            <div className="flex gap-4 items-start justify-between w-full">
              <div className="flex flex-col gap-2">
                <p className="typography-body4 text-neutral-600">All corners</p>
                <SizeInput value={getLinkedValue()} onChange={handleLinkedChange} />
              </div>
              <div className="flex items-center justify-center">
                <div
                  className="border-2 border-neutral-400 aspect-square w-16 h-16"
                  style={{
                    borderRadius: borderRadiusToStyle(value),
                  }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3">
              <div>
                <p className="typography-body4 text-neutral-600">Top left</p>
                <BorderCorner value={value} handleChange={handleChange} borderType="topLeft" />
              </div>
              <div />
              <div>
                <p className="typography-body4 text-neutral-600">Top right</p>
                <BorderCorner value={value} handleChange={handleChange} borderType="topRight" />
              </div>
              <div />
              <div className="flex items-center justify-center">
                <div
                  className="border-2 border-neutral-400 aspect-square w-1/2"
                  style={{
                    borderRadius: borderRadiusToStyle(value),
                  }}
                ></div>
              </div>
              <div />
              <div>
                <p className="typography-body4 text-neutral-600">Bottom left</p>
                <BorderCorner value={value} handleChange={handleChange} borderType="bottomLeft" />
              </div>
              <div />
              <div>
                <p className="typography-body4 text-neutral-600">Bottom right</p>
                <BorderCorner value={value} handleChange={handleChange} borderType="bottomRight" />
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
  function handleInternalChange(
    newSize: Size,
    borderType: keyof BorderRadiusProperty['value'],
    index: number,
  ) {
    const cornerSize = value[borderType];
    if (Array.isArray(cornerSize)) {
      const newSizeArray = [...cornerSize];
      newSizeArray[index] = newSize;
      handleChange(newSizeArray, borderType);
    } else {
      handleChange(newSize, borderType);
    }
  }

  return (
    <>
      {Array.isArray(value[borderType]) ? (
        <>
          {value[borderType].map((size, index) => (
            <SizeInput
              key={index}
              className="w-full"
              value={size}
              onChange={(newSize) => handleInternalChange(newSize, borderType, index)}
            />
          ))}
        </>
      ) : (
        <SizeInput
          className="w-full"
          value={value[borderType]}
          onChange={(newSize) => handleInternalChange(newSize, borderType, 0)}
        />
      )}
    </>
  );
}
