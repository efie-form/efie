import { useCallback } from 'react';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { isWidthValue, type PropertyDefinition, type Width } from '@efie-form/core';
import { Input, Number as NumberInput, Select } from '../../../components/form';
import SizeInput from '../../../components/form/SizeInput';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { HiInformationCircle } from 'react-icons/hi2';

const WIDTH_TYPE_OPTIONS = [
  { value: 'size', label: 'Fixed Size' },
  { value: 'anchor-size', label: 'Anchor Size' },
  { value: 'fit-content', label: 'Fit Content' },
  { value: 'auto', label: 'Auto' },
  { value: 'stretch', label: 'Stretch' },
  { value: 'max-content', label: 'Max Content' },
  { value: 'min-content', label: 'Min Content' },
  { value: 'inherit', label: 'Inherit' },
  { value: 'initial', label: 'Initial' },
  { value: 'unset', label: 'Unset' },
  { value: 'revert', label: 'Revert' },
  { value: 'revert-layer', label: 'Revert Layer' },
];

const WIDTH_KEYWORD_DESCRIPTIONS = {
  'auto': 'Let the browser calculate the width automatically',
  'stretch': 'Stretch to fill the available space',
  'max-content': 'Size based on the largest content',
  'min-content': 'Size based on the smallest content',
  'inherit': 'Use the same width as the parent element',
  'initial': 'Reset to the default browser value',
  'unset': 'Remove any previously set width values',
  'revert': 'Use the browser or user stylesheet value',
  'revert-layer': 'Revert to the previous cascade layer',
};

interface DescriptionPopoverProps {
  description: string;
  title: string;
}

function DescriptionPopover({ description, title }: DescriptionPopoverProps) {
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center w-4 h-4 ml-2 text-neutral-500 hover:text-neutral-700 transition-colors"
          aria-label={`More information about ${title}`}
        >
          <HiInformationCircle className="w-4 h-4" />
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side="right"
          align="start"
          sideOffset={8}
          className="z-50 max-w-xs"
        >
          <div className="bg-white p-3 rounded-lg shadow-lg border border-neutral-200">
            <div className="space-y-2">
              <h4 className="typography-body3 font-medium text-neutral-800">
                {title}
              </h4>
              <p className="typography-body4 text-neutral-600">
                {description}
              </p>
            </div>
          </div>
          <PopoverPrimitive.Arrow className="fill-white" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

function getDescriptionForValue(value: string): string {
  if (value === 'size') {
    return 'Set a specific width value with units like pixels (px), percentages (%), em, rem, or viewport units (vw).';
  }
  if (value === 'anchor-size') {
    return 'Size relative to an anchor element using CSS anchor positioning.';
  }
  if (value === 'fit-content') {
    return 'The element will size to fit its content, with an optional maximum value limit.';
  }
  return WIDTH_KEYWORD_DESCRIPTIONS[value as keyof typeof WIDTH_KEYWORD_DESCRIPTIONS] || 'CSS keyword for width behavior.';
}

function getDisplayName(value: string): string {
  const option = WIDTH_TYPE_OPTIONS.find(opt => opt.value === value);
  return option ? option.label : value;
}

interface PropsTemplateWidthProps {
  fieldId: string;
  label: string;
  type: PropertyDefinition['type'];
}

export function PropsTemplateWidth({ fieldId, label, type }: PropsTemplateWidthProps) {
  const fieldProperty = useSchemaStore(
    useCallback(
      state => state.getFieldProperty(fieldId, type),
      [fieldId, type],
    ),
  );
  const updateFieldProperty = useSchemaStore(state => state.updateFieldProperty);
  const value = getValue(fieldProperty);

  const handleTypeChange = (newType: string) => {
    let newValue: Width;
    switch (newType) {
      case 'size': {
        newValue = { type: 'size', value: { type: 'size', value: 100, unit: '%' } };
        break;
      }
      case 'anchor-size': {
        newValue = { type: 'anchor-size', value: { type: 'anchor-size', anchorName: '', anchorSize: '', lengthPercentage: 100 } };
        break;
      }
      case 'fit-content': {
        newValue = { type: 'fit-content', value: { type: 'size', value: 100, unit: '%' } };
        break;
      }
      default: {
        // Handle all CSS keywords
        newValue = {
          type: 'keyword',
          value: newType as 'auto' | 'stretch' | 'max-content' | 'min-content' | 'inherit' | 'initial' | 'unset' | 'revert' | 'revert-layer',
        };
      }
    }
    updateFieldProperty(fieldId, { type, value: newValue } as PropertyDefinition);
  };

  const handleSizeChange = (newValue: number) => {
    if (value.type === 'size' && typeof value.value === 'object' && 'unit' in value.value) {
      updateFieldProperty(fieldId, {
        type,
        value: { type: 'size', value: { ...value.value, value: newValue } },
      } as PropertyDefinition);
    }
  };

  const handleUnitChange = (newUnit: string) => {
    if (value.type === 'size' && typeof value.value === 'object' && 'value' in value.value) {
      updateFieldProperty(fieldId, {
        type,
        value: { type: 'size', value: { ...value.value, unit: newUnit } },
      } as PropertyDefinition);
    }
  };

  const handleAnchorChange = (field: 'anchorName' | 'anchorSize' | 'lengthPercentage', newValue: string | number) => {
    if (value.type === 'anchor-size' && typeof value.value === 'object') {
      updateFieldProperty(fieldId, {
        type,
        value: {
          type: 'anchor-size',
          value: {
            ...value.value,
            [field]: newValue,
          },
        },
      } as PropertyDefinition);
    }
  };

  const handleFitContentSizeChange = (newValue: number) => {
    if (value.type === 'fit-content') {
      let unit = '%';
      if (typeof value.value === 'object' && 'unit' in value.value) {
        unit = value.value.unit;
      }

      // If the value is 0 or falsy, remove the value constraint (no maximum)
      if (!newValue || newValue === 0) {
        updateFieldProperty(fieldId, {
          type,
          value: { type: 'fit-content', value: undefined },
        } as PropertyDefinition);
      }
      else {
        updateFieldProperty(fieldId, {
          type,
          value: { type: 'fit-content', value: { type: 'size', value: newValue, unit } },
        } as PropertyDefinition);
      }
    }
  };

  return (
    <div className="p-4 border-b border-neutral-100">
      <div className="mb-4">
        <h3 className="typography-body2 font-medium text-neutral-800 mb-3">{label}</h3>

        {/* Type Selector */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <label className="typography-body3 text-neutral-700">
              Width Type
            </label>
            {(() => {
              // Get current selection for dynamic description
              const currentValue = value.type === 'keyword' ? String(value.value) : value.type;
              const description = getDescriptionForValue(currentValue);
              return (
                <DescriptionPopover
                  title={getDisplayName(currentValue)}
                  description={description}
                />
              );
            })()}
          </div>
          <Select
            value={value.type === 'keyword' ? String(value.value) : value.type}
            onChange={handleTypeChange}
            options={WIDTH_TYPE_OPTIONS}
            className="w-full"
          />
        </div>

        {/* Dynamic Content Based on Type */}
        <div className="space-y-4">
          {value.type === 'size' && typeof value.value === 'object' && (
            <div className="bg-neutral-50 rounded-lg p-3 border border-neutral-200">
              <div className="flex items-center mb-2">
                <label className="typography-body3 text-neutral-700">
                  Size
                </label>
                <DescriptionPopover
                  title="Fixed Size"
                  description="Set a specific width value with units like pixels (px), percentages (%), em, rem, or viewport units (vw)."
                />
              </div>
              <SizeInput
                value={typeof value.value.value === 'number' ? value.value.value : 100}
                unit={String(value.value.unit)}
                onValueChange={handleSizeChange}
                onUnitChange={handleUnitChange}
                className="w-full"
              />
            </div>
          )}

          {value.type === 'anchor-size' && typeof value.value === 'object' && (
            <div className="bg-neutral-50 rounded-lg p-3 border border-neutral-200 space-y-3">
              <div>
                <div className="flex items-center mb-2">
                  <label className="typography-body3 text-neutral-700">
                    Anchor Name
                  </label>
                  <DescriptionPopover
                    title="Anchor Name"
                    description="The name of the anchor element to reference. This must match the anchor-name property of another element."
                  />
                </div>
                <Input
                  value={value.value.anchorName || ''}
                  onChange={v => handleAnchorChange('anchorName', v)}
                  placeholder="e.g., my-anchor"
                  className="w-full"
                />
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <label className="typography-body3 text-neutral-700">
                    Anchor Size Property
                  </label>
                  <DescriptionPopover
                    title="Anchor Size Property"
                    description="Which dimension of the anchor element to use as reference: width, height, inline-size, or block-size."
                  />
                </div>
                <Input
                  value={value.value.anchorSize || ''}
                  onChange={v => handleAnchorChange('anchorSize', v)}
                  placeholder="e.g., width, height"
                  className="w-full"
                />
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <label className="typography-body3 text-neutral-700">
                    Percentage (%)
                  </label>
                  <DescriptionPopover
                    title="Percentage"
                    description="What percentage of the anchor element's size to use. 100% means use the full size of the anchor."
                  />
                </div>
                <NumberInput
                  value={typeof value.value.lengthPercentage === 'number' ? value.value.lengthPercentage : 100}
                  onChange={v => handleAnchorChange('lengthPercentage', v)}
                  className="w-full"
                  inputProps={{ min: 0, max: 100 }}
                />
              </div>
            </div>
          )}

          {value.type === 'fit-content' && (
            <div className="bg-neutral-50 rounded-lg p-3 border border-neutral-200">
              <div className="flex items-center mb-2">
                <label className="typography-body3 text-neutral-700">
                  Maximum Size (Optional)
                </label>
                <DescriptionPopover
                  title="Fit Content Maximum"
                  description="The element will size to fit its content, but won't exceed this maximum value. This is useful for responsive designs. Leave empty for no maximum constraint."
                />
              </div>
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <NumberInput
                    value={typeof value.value === 'object' && value.value && typeof value.value.value === 'number' ? value.value.value : 0}
                    onChange={handleFitContentSizeChange}
                    className="w-full"
                    inputProps={{ min: 0, placeholder: 'No maximum' }}
                  />
                </div>
                <div className="w-16">
                  <Select
                    value={(typeof value.value === 'object' && value.value && value.value.unit) || '%'}
                    onChange={(unit) => {
                      if (value.type === 'fit-content') {
                        const currentValue = typeof value.value === 'object' && value.value && typeof value.value.value === 'number' ? value.value.value : 100;
                        updateFieldProperty(fieldId, {
                          type,
                          value: { type: 'fit-content', value: { type: 'size', value: currentValue, unit } },
                        } as PropertyDefinition);
                      }
                    }}
                    options={[
                      { value: 'px', label: 'px' },
                      { value: '%', label: '%' },
                      { value: 'em', label: 'em' },
                      { value: 'rem', label: 'rem' },
                      { value: 'vw', label: 'vw' },
                    ]}
                    className="text-xs"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getValue(props?: PropertyDefinition): Width {
  if (!isWidthValue(props)) return {
    type: 'size',
    value: {
      type: 'size',
      value: 100,
      unit: '%',
    },
  };
  return props.value;
}
