import { useCallback } from 'react';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { isWidthValue, type PropertyDefinition, type Width } from '@efie-form/core';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';
import { Input, Number as NumberInput, Select } from '../../../components/form';
import SizeInput from '../../../components/form/SizeInput';

const WIDTH_TYPE_OPTIONS = [
  { value: 'size', label: 'Fixed size' },
  { value: 'anchor-size', label: 'Anchor size' },
  { value: 'fit-content', label: 'Fit content' },
  { value: 'keyword', label: 'Keyword' },
];

const WIDTH_KEYWORDS = [
  'auto',
  'stretch',
  'max-content',
  'min-content',
  'inherit',
  'initial',
  'unset',
  'revert',
  'revert-layer',
];

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
      case 'keyword': {
        newValue = { type: 'keyword', value: 'auto' };
        break;
      }
      default: {
        newValue = { type: 'size', value: { type: 'size', value: 100, unit: '%' } };
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

  const handleKeywordChange = (newKeyword: string) => {
    updateFieldProperty(fieldId, {
      type,
      value: { type: 'keyword', value: newKeyword },
    } as PropertyDefinition);
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
    let unit = '%';
    if (value.type === 'fit-content' && typeof value.value === 'object' && 'unit' in value.value) {
      unit = value.value.unit;
    }
    updateFieldProperty(fieldId, {
      type,
      value: { type: 'fit-content', value: { type: 'size', value: newValue, unit } },
    } as PropertyDefinition);
  };

  return (
    <SettingsFieldHorizontal label={label} divider>
      <div className="flex gap-2 items-center">
        <div>
          <Select
            value={value.type}
            onChange={handleTypeChange}
            options={WIDTH_TYPE_OPTIONS}
          />
        </div>
        <div>
          {value.type === 'size' && typeof value.value === 'object' && (
            <SizeInput
              value={typeof value.value.value === 'number' ? value.value.value : 100}
              unit={String(value.value.unit)}
              onValueChange={handleSizeChange}
              onUnitChange={handleUnitChange}
            />
          )}
          {value.type === 'anchor-size' && typeof value.value === 'object' && (
            <>
              <Input
                value={value.value.anchorName || ''}
                onChange={v => handleAnchorChange('anchorName', v)}
                placeholder="Anchor name"
                className="w-24"
              />
              <Input
                value={value.value.anchorSize || ''}
                onChange={v => handleAnchorChange('anchorSize', v)}
                placeholder="Anchor size"
                className="w-20"
              />
              <NumberInput
                value={typeof value.value.lengthPercentage === 'number' ? value.value.lengthPercentage : 100}
                onChange={v => handleAnchorChange('lengthPercentage', v)}
                className="w-16"
              />
            </>
          )}
          {value.type === 'fit-content' && typeof value.value === 'object' && (
            <NumberInput
              value={typeof value.value.value === 'number' ? value.value.value : 100}
              onChange={handleFitContentSizeChange}
              className="w-20"
            />
          )}
          {value.type === 'keyword' && (
            <Select
              value={String(value.value)}
              onChange={handleKeywordChange}
              options={WIDTH_KEYWORDS.map(k => ({ value: k, label: k }))}
              className="w-32"
            />
          )}
        </div>
      </div>
    </SettingsFieldHorizontal>
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
