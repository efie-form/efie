import { useState, useRef, useEffect } from 'react';
import { useSchemaStore } from '../../../lib/state/schema.state';
import type { PropertyDefinition, MarginProperty, PropValue, PropValueMargin } from '@efie-form/core';
import { isMarginValue, SizeType, type MarginSize, type Size } from '@efie-form/core';
import SizeInput from '../../../components/form/size-input';
import { FaLink, FaUnlink } from 'react-icons/fa';

interface PropSettingsMargin {
  template: 'margin';
  type: PropertyDefinition['type'];
  label: string;
}

interface PropsSettingsMarginProps extends PropSettingsMargin {
  fieldId: string;
}

// Helper to normalize values for comparison
const normalizeValue = (val: Size): string => {
  return JSON.stringify(val);
};

export default function PropsSettingsMargin({ fieldId, label, type }: PropsSettingsMarginProps) {
  const fieldProperty = useSchemaStore(
    state => (state.getFieldProperty(fieldId, type)),
  );
  const updateFieldProperty = useSchemaStore(state => state.updateFieldProperty);
  const value = getValue(fieldProperty?.value);
  const [isLinked, setIsLink] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const previousValuesRef = useRef<MarginProperty['value'] | null>(null);

  // Helper function to check if all margin values are the same
  const areAllMarginsSame = (marginValue: MarginProperty['value']): boolean => {
    const { top, right, bottom, left } = marginValue;

    const topStr = normalizeValue(top);
    const rightStr = normalizeValue(right);
    const bottomStr = normalizeValue(bottom);
    const leftStr = normalizeValue(left);

    return topStr === rightStr
      && rightStr === bottomStr
      && bottomStr === leftStr;
  };

  // Check if all margins are the same when component mounts or value changes
  useEffect(() => {
    const allSame = areAllMarginsSame(value);
    // Only auto-link if currently unlinked, all margins are the same, AND user hasn't manually interacted
    if (allSame && !isLinked && !hasUserInteracted) {
      setIsLink(true);
    }
    // Don't auto-unlink if values become different - let user control this
  }, [value, areAllMarginsSame, isLinked, hasUserInteracted]);

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
      if (!areAllMarginsSame(value)) {
        previousValuesRef.current = { ...value };
      }
      // Set all margins to the same value (using top as reference)
      const uniformValue = value.top;
      updateFieldProperty(fieldId, {
        type,
        value: {
          top: uniformValue,
          right: uniformValue,
          bottom: uniformValue,
          left: uniformValue,
        },
      } as PropertyDefinition);
    }
    setIsLink(!isLinked);
  };

  const handleChange = (newValue: MarginSize, marginSide: keyof MarginProperty['value']) => {
    updateFieldProperty(fieldId, {
      type,
      value: {
        ...value,
        [marginSide]: newValue,
      },
    } as PropertyDefinition);
  };

  const handleLinkedChange = (newValue: Size) => {
    updateFieldProperty(fieldId, {
      type,
      value: {
        top: newValue,
        right: newValue,
        bottom: newValue,
        left: newValue,
      },
    } as PropertyDefinition);
  };

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
          {isLinked
            ? (
                <div className="flex gap-4 items-start w-full">
                  <div className="flex flex-col gap-2">
                    <p className="typography-body4 text-neutral-600">All sides</p>
                    <SizeInput
                      value={value.top}
                      onChange={handleLinkedChange}
                    />
                  </div>
                </div>
              )
            : (
                <div className="grid grid-cols-3 gap-2 w-full">
                  <div></div>
                  <div>
                    <p className="typography-body4 text-neutral-600 text-center">Top</p>
                    <MarginSide
                      value={value}
                      handleChange={handleChange}
                      marginSide="top"
                    />
                  </div>
                  <div></div>
                  <div>
                    <p className="typography-body4 text-neutral-600 text-center">Left</p>
                    <MarginSide
                      value={value}
                      handleChange={handleChange}
                      marginSide="left"
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="relative w-12 h-12">
                      <div className="absolute inset-0 border-2 border-neutral-400"></div>
                      <div
                        className="absolute bg-neutral-200"
                        style={{
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '4px',
                        }}
                      />
                      <div
                        className="absolute bg-neutral-200"
                        style={{
                          top: 0,
                          right: 0,
                          bottom: 0,
                          width: '4px',
                        }}
                      />
                      <div
                        className="absolute bg-neutral-200"
                        style={{
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '4px',
                        }}
                      />
                      <div
                        className="absolute bg-neutral-200"
                        style={{
                          top: 0,
                          left: 0,
                          bottom: 0,
                          width: '4px',
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="typography-body4 text-neutral-600 text-center">Right</p>
                    <MarginSide
                      value={value}
                      handleChange={handleChange}
                      marginSide="right"
                    />
                  </div>
                  <div></div>
                  <div>
                    <p className="typography-body4 text-neutral-600 text-center">Bottom</p>
                    <MarginSide
                      value={value}
                      handleChange={handleChange}
                      marginSide="bottom"
                    />
                  </div>
                  <div></div>
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

interface MarginSideProps {
  value: MarginProperty['value'];
  handleChange: (newValue: MarginSize, marginSide: keyof MarginProperty['value']) => void;
  marginSide: keyof MarginProperty['value'];
}

function MarginSide({ value, handleChange, marginSide }: MarginSideProps) {
  return (
    <SizeInput
      className="w-full"
      value={value[marginSide]}
      onChange={newSize => handleChange(newSize as MarginSize, marginSide)}
    />
  );
}

function getValue(value?: PropValue): PropValueMargin {
  if (!isMarginValue(value)) return {
    top: { type: SizeType.LENGTH, value: 0, unit: 'px' },
    right: { type: SizeType.LENGTH, value: 0, unit: 'px' },
    bottom: { type: SizeType.LENGTH, value: 0, unit: 'px' },
    left: { type: SizeType.LENGTH, value: 0, unit: 'px' },
  };

  return value;
}
