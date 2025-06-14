import { useCallback, useState, useRef, useEffect } from 'react';
import { useSchemaStore } from '../../../lib/state/schema.state';
import type { PropertyDefinition, PaddingProperty, PropValue, PropValuePadding } from '@efie-form/core';
import { isPaddingValue, SizeType, type PaddingSize, type Size } from '@efie-form/core';
import SizeInput from '../../../components/form/SizeInput';
import { FaLink, FaUnlink } from 'react-icons/fa';
import type { PropSettingsPadding } from '../../../types/prop-settings.type';

interface PropsSettingsPaddingProps extends PropSettingsPadding {
  fieldId: string;
}

export default function PropsSettingsPadding({ fieldId, label, type }: PropsSettingsPaddingProps) {
  const fieldProperty = useSchemaStore(useCallback(
    state => (state.getFieldProperty(fieldId, type)),
    [fieldId, type],
  ));
  const updateFieldProperty = useSchemaStore(state => state.updateFieldProperty);
  const value = getValue(fieldProperty?.value);
  const [isLinked, setIsLink] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const previousValuesRef = useRef<PaddingProperty['value'] | null>(null);

  // Helper function to check if all padding values are the same
  const areAllPaddingsSame = useCallback((paddingValue: PaddingProperty['value']): boolean => {
    const { top, right, bottom, left } = paddingValue;

    // Helper to normalize values for comparison
    const normalizeValue = (val: Size): string => {
      return JSON.stringify(val);
    };

    const topStr = normalizeValue(top);
    const rightStr = normalizeValue(right);
    const bottomStr = normalizeValue(bottom);
    const leftStr = normalizeValue(left);

    return topStr === rightStr
      && rightStr === bottomStr
      && bottomStr === leftStr;
  }, []);

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
        updateFieldProperty(fieldId, {
          type,
          value: previousValuesRef.current,
        } as PropertyDefinition);
      }
    }
    else {
      // Store current values before linking (only if they're not already the same)
      if (!areAllPaddingsSame(value)) {
        previousValuesRef.current = { ...value };
      }
      // Set all paddings to the same value (using top as reference)
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

  const handleChange = useCallback((newValue: PaddingSize, paddingSide: keyof PaddingProperty['value']) => {
    updateFieldProperty(fieldId, {
      type,
      value: {
        ...value,
        [paddingSide]: newValue,
      },
    } as PropertyDefinition);
  }, [fieldId, updateFieldProperty, type, value]);

  const handleLinkedChange = useCallback((newValue: Size) => {
    updateFieldProperty(fieldId, {
      type,
      value: {
        top: newValue,
        right: newValue,
        bottom: newValue,
        left: newValue,
      },
    } as PropertyDefinition);
  }, [fieldId, updateFieldProperty, type]);

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
                    <PaddingSide
                      value={value}
                      handleChange={handleChange}
                      paddingSide="top"
                    />
                  </div>
                  <div></div>
                  <div>
                    <p className="typography-body4 text-neutral-600 text-center">Left</p>
                    <PaddingSide
                      value={value}
                      handleChange={handleChange}
                      paddingSide="left"
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="relative w-12 h-12">
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
                    <p className="typography-body4 text-neutral-600 text-center">Right</p>
                    <PaddingSide
                      value={value}
                      handleChange={handleChange}
                      paddingSide="right"
                    />
                  </div>
                  <div></div>
                  <div>
                    <p className="typography-body4 text-neutral-600 text-center">Bottom</p>
                    <PaddingSide
                      value={value}
                      handleChange={handleChange}
                      paddingSide="bottom"
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
      onChange={newSize => handleChange(newSize as PaddingSize, paddingSide)}
    />
  );
}

function getValue(props?: PropValue): PropValuePadding {
  if (!isPaddingValue(props)) return {
    top: { type: SizeType.LENGTH, value: 0, unit: 'px' },
    right: { type: SizeType.LENGTH, value: 0, unit: 'px' },
    bottom: { type: SizeType.LENGTH, value: 0, unit: 'px' },
    left: { type: SizeType.LENGTH, value: 0, unit: 'px' },
  };

  return props;
}
