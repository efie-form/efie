import { useSchemaStore } from '../../../lib/state/schema.state';
import type { FormField, FormFieldShortText } from '@efie-form/core';
import { FormFieldType } from '@efie-form/core';
import Switch from '../../../components/form/Switch';
import Select from '../../../components/form/Select';
import Input from '../../../components/form/Input';
import { useState, useEffect } from 'react';

interface SettingsFieldRegexProps {
  label: string;
  switchLabel?: string;
  divider?: boolean;
  field: FormField;
  presets?: RegexPreset[];
}

interface RegexPreset {
  label: string;
  value: string;
  pattern: string;
}

// Type guard to check if field is ShortText and has pattern
const isShortTextField = (field: FormField): field is FormFieldShortText => {
  return field.type === FormFieldType.SHORT_TEXT && 'validations' in field;
};

// Default regex presets
const defaultPresets: RegexPreset[] = [
  {
    label: 'Email',
    value: 'email',
    pattern: String.raw`^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$`,
  },
  {
    label: 'URL',
    value: 'url',
    pattern: String.raw`https?://(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)`,
  },
  {
    label: 'Phone Number',
    value: 'phone',
    pattern: String.raw`^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$`,
  },
  {
    label: 'ZIP Code',
    value: 'zip',
    pattern: String.raw`^[0-9]{5}(?:-[0-9]{4})?$`,
  },
  {
    label: 'IP Address',
    value: 'ip',
    pattern: String.raw`^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$`,
  },
  { label: 'Custom', value: 'custom', pattern: '' },
];

function SettingsFieldRegex({
  label,
  divider,
  switchLabel,
  field,
  presets = defaultPresets,
}: SettingsFieldRegexProps) {
  const { updateFieldProps } = useSchemaStore();
  const [selectedPreset, setSelectedPreset] = useState<string>('custom');
  const [customPattern, setCustomPattern] = useState<string>('');
  const [hasPattern, setHasPattern] = useState<boolean>(false);

  useEffect(() => {
    if (!isShortTextField(field)) return;

    // Initialize states based on current field value
    const pattern = field.validations.pattern;

    if (pattern) {
      setHasPattern(true);

      // Check if the pattern matches any preset
      const matchingPreset = presets.find(
        (preset) => preset.pattern === pattern
      );
      if (matchingPreset) {
        setSelectedPreset(matchingPreset.value);
      } else {
        setSelectedPreset('custom');
        setCustomPattern(pattern);
      }
    } else {
      setHasPattern(false);
      setSelectedPreset('custom');
      setCustomPattern('');
    }
  }, [field, presets]);

  const handleTogglePattern = (value: boolean) => {
    setHasPattern(value);

    if (!isShortTextField(field)) return;

    if (value) {
      // If turning on pattern validation, set the pattern based on selected preset
      const patternToUse =
        selectedPreset === 'custom'
          ? customPattern
          : presets.find((preset) => preset.value === selectedPreset)
              ?.pattern || '';

      updateFieldProps(field.id, 'validations.pattern', patternToUse);
    } else {
      // If turning off pattern validation, clear the pattern
      updateFieldProps(field.id, 'validations.pattern', '');
    }
  };

  const handlePresetChange = (value: string) => {
    setSelectedPreset(value);

    if (!isShortTextField(field) || !hasPattern) return;

    if (value === 'custom') {
      updateFieldProps(field.id, 'validations.pattern', customPattern);
    } else {
      const pattern =
        presets.find((preset) => preset.value === value)?.pattern || '';
      updateFieldProps(field.id, 'validations.pattern', pattern);
    }
  };

  const handleCustomPatternChange = (value: string) => {
    setCustomPattern(value);

    if (isShortTextField(field) && hasPattern && selectedPreset === 'custom') {
      updateFieldProps(field.id, 'validations.pattern', value);
    }
  };

  if (!isShortTextField(field)) return <></>;

  return (
    <>
      <div className="px-4 py-3.5">
        <div className="flex justify-between items-center">
          <div>
            <p className="typography-body3 text-neutral-800">{label}</p>
          </div>
          <div className="flex gap-2 items-center">
            {switchLabel && (
              <p className="typography-body4 text-neutral-800">{switchLabel}</p>
            )}
            <Switch checked={hasPattern} onChange={handleTogglePattern} />
          </div>
        </div>

        {hasPattern && (
          <div className="mt-4 space-y-3">
            <div>
              <p className="typography-body4 text-neutral-700 mb-1">
                Pattern Type
              </p>
              <Select
                value={selectedPreset}
                onChange={handlePresetChange}
                options={presets.map((preset) => ({
                  label: preset.label,
                  value: preset.value,
                }))}
              />
            </div>

            {selectedPreset === 'custom' && (
              <div>
                <p className="typography-body4 text-neutral-700 mb-1">
                  Custom Pattern
                </p>
                <Input
                  value={customPattern}
                  onChange={handleCustomPatternChange}
                  placeholder="Enter regex pattern"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {divider && (
        <div className="mx-4">
          <div className="w-full border-t-[0.5px] border-neutral-200 h-[1px]" />
        </div>
      )}
    </>
  );
}

export default SettingsFieldRegex;
