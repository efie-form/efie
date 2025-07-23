import type { PaddingProperty, PaddingSize, PropValuePadding, Size } from '@efie-form/core';
import { useEffect, useRef, useState } from 'react';
import { FaLink, FaUnlink } from 'react-icons/fa';
import SizeInput from '../../../components/form/size-input';

interface PropsSettingsPaddingProps {
  label: string;
  value: PropValuePadding;
  onChange: (newValue: PropValuePadding) => void;
}

// Helper to normalize values for comparison
const normalizeValue = (val: Size): string => {
  return JSON.stringify(val);
};

export default function PropsSettingsPadding({
  label,
  onChange,
  value,
}: PropsSettingsPaddingProps) {
  const [isLinked, setIsLink] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const previousValuesRef = useRef<PaddingProperty['value'] | null>(null);

  // Helper function to check if all padding values are the same
  const areAllPaddingsSame = (paddingValue: PaddingProperty['value']): boolean => {
    const { top, right, bottom, left } = paddingValue;

    const topStr = normalizeValue(top);
    const rightStr = normalizeValue(right);
    const bottomStr = normalizeValue(bottom);
    const leftStr = normalizeValue(left);

    return topStr === rightStr && rightStr === bottomStr && bottomStr === leftStr;
  };

  // Check if all paddings are the same when component mounts or value changes
  useEffect(() => {
    const allSame = areAllPaddingsSame(value);
    // Only auto-link if currently unlinked, all paddings are the same, AND user hasn't manually interacted
    if (allSame && !isLinked && !hasUserInteracted) {
      setIsLink(true);
    }
    // Don't auto-unlink if values become different - let user control this
  }, [value, areAllPaddingsSame, isLinked, hasUserInteracted]);

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
      if (!areAllPaddingsSame(value)) {
        previousValuesRef.current = { ...value };
      }
      // Set all paddings to the same value (using top as reference)
      const uniformValue = value.top;
      onChange({
        top: uniformValue,
        right: uniformValue,
        bottom: uniformValue,
        left: uniformValue,
      });
    }
    setIsLink(!isLinked);
  };

  const handleChange = (newValue: PaddingSize, paddingSide: keyof PaddingProperty['value']) => {
    onChange({
      ...value,
      [paddingSide]: newValue,
    });
  };

  const handleLinkedChange = (newValue: Size) => {
    onChange({
      top: newValue,
      right: newValue,
      bottom: newValue,
      left: newValue,
    });
  };

  return (
    <>
      <div className="px-4 py-3.5">
        <div className="mb-2 flex items-center justify-between">
          <p className="typography-body3 text-neutral-800">{label}</p>
          <div>
            <button
              type="button"
              onClick={toggleLink}
              className="flex items-center gap-2 text-neutral-600"
            >
              {isLinked ? <FaLink /> : <FaUnlink />}
            </button>
          </div>
        </div>
        <div className="flex gap-4">
          {isLinked ? (
            <div className="flex w-full items-start gap-4">
              <div className="flex flex-col gap-2">
                <p className="typography-body4 text-neutral-600">All sides</p>
                <SizeInput value={value.top} onChange={handleLinkedChange} />
              </div>
            </div>
          ) : (
            <div className="grid w-full grid-cols-3 gap-2">
              <div></div>
              <div>
                <p className="typography-body4 text-center text-neutral-600">Top</p>
                <PaddingSide value={value} handleChange={handleChange} paddingSide="top" />
              </div>
              <div></div>
              <div>
                <p className="typography-body4 text-center text-neutral-600">Left</p>
                <PaddingSide value={value} handleChange={handleChange} paddingSide="left" />
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-12 w-12">
                  <div className="absolute inset-0 border-2 border-neutral-400"></div>
                  <div
                    className="absolute bg-primary-200"
                    style={{
                      top: '4px',
                      left: '4px',
                      right: '4px',
                      height: '4px',
                    }}
                  />
                  <div
                    className="absolute bg-primary-200"
                    style={{
                      top: '4px',
                      right: '4px',
                      bottom: '4px',
                      width: '4px',
                    }}
                  />
                  <div
                    className="absolute bg-primary-200"
                    style={{
                      bottom: '4px',
                      left: '4px',
                      right: '4px',
                      height: '4px',
                    }}
                  />
                  <div
                    className="absolute bg-primary-200"
                    style={{
                      top: '4px',
                      left: '4px',
                      bottom: '4px',
                      width: '4px',
                    }}
                  />
                </div>
              </div>
              <div>
                <p className="typography-body4 text-center text-neutral-600">Right</p>
                <PaddingSide value={value} handleChange={handleChange} paddingSide="right" />
              </div>
              <div></div>
              <div>
                <p className="typography-body4 text-center text-neutral-600">Bottom</p>
                <PaddingSide value={value} handleChange={handleChange} paddingSide="bottom" />
              </div>
              <div></div>
            </div>
          )}
        </div>
      </div>
      <div className="mx-4">
        <div className="h-[1px] w-full border-neutral-400 border-t-[0.5px]" />
      </div>
    </>
  );
}

interface PaddingSideProps {
  value: PaddingProperty['value'];
  handleChange: (newValue: PaddingSize, paddingSide: keyof PaddingProperty['value']) => void;
  paddingSide: keyof PaddingProperty['value'];
}

function PaddingSide({ value, handleChange, paddingSide }: PaddingSideProps) {
  return (
    <SizeInput
      className="w-full"
      value={value[paddingSide]}
      onChange={(newSize) => handleChange(newSize as PaddingSize, paddingSide)}
    />
  );
}
