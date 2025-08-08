import {
  type FieldSystemConfigPasswordPolicy,
  isPasswordPolicyValue,
  type PropValuePasswordPolicy,
} from '@efie-form/core';
import { useRef } from 'react';
import NumberInput from '../../../components/form/number';
import { useSchemaStore } from '../../../lib/state/schema.state';
import SettingsFieldSwitchWithDropdown from '../property-layouts/settings-field-switch-with-dropdown';

interface SystemSettingsPasswordPolicyProps {
  fieldId: string;
  config: FieldSystemConfigPasswordPolicy;
}

type Rule = { min?: number; max?: number };

type EditablePolicy = PropValuePasswordPolicy & {
  digits?: Rule;
  uppercase?: Rule;
  lowercase?: Rule;
  special?: Rule;
};

export default function SystemSettingsPasswordPolicy({
  fieldId,
  config,
}: SystemSettingsPasswordPolicyProps) {
  const fieldProperty = useSchemaStore((s) => s.getFieldProperty(fieldId, config.type));
  const updateFieldProperty = useSchemaStore((s) => s.updateFieldProperty);

  const policyValue: EditablePolicy | undefined = isPasswordPolicyValue(fieldProperty?.value)
    ? (fieldProperty?.value as EditablePolicy)
    : undefined;

  const lastPolicyRef = useRef<EditablePolicy | undefined>(undefined);

  const enabled = policyValue !== undefined;

  const setValue = (next: EditablePolicy | undefined) => {
    updateFieldProperty(fieldId, { type: config.type, value: next as PropValuePasswordPolicy });
  };

  const toggleEnabled = (next: boolean) => {
    if (next) {
      const base: EditablePolicy = lastPolicyRef.current || {
        digits: { min: 1 },
        uppercase: { min: 1 },
        lowercase: { min: 1 },
        special: { min: 1 },
      };
      setValue(base);
    } else {
      // store current then clear from schema (lost in schema but recoverable while mounted)
      lastPolicyRef.current = policyValue ? { ...policyValue } : undefined;
      setValue(undefined);
    }
  };

  const updateRule = (
    key: keyof EditablePolicy & ('digits' | 'uppercase' | 'lowercase' | 'special'),
    part: 'min' | 'max',
    val?: number,
  ) => {
    if (!policyValue) return;
    const current = policyValue[key] as Rule | undefined;
    setValue({
      ...policyValue,
      [key]: {
        ...(current || {}),
        [part]: val,
      },
    });
  };

  const getRuleValue = (
    key: keyof EditablePolicy & ('digits' | 'uppercase' | 'lowercase' | 'special'),
    part: 'min' | 'max',
  ) => {
    if (!policyValue) return undefined;
    const rule = policyValue[key] as Rule | undefined;
    if (!rule) return undefined;
    const val = (rule as Record<string, unknown>)[part];
    return typeof val === 'number' ? val : undefined;
  };

  const renderNumberInput = (
    key: keyof EditablePolicy & ('digits' | 'uppercase' | 'lowercase' | 'special'),
    part: 'min' | 'max',
  ) => (
    <NumberInput
      value={getRuleValue(key, part)}
      onChange={(v) => updateRule(key, part, v)}
      disabled={!enabled}
      inputProps={{
        min: 0,
      }}
    />
  );

  return (
    <SettingsFieldSwitchWithDropdown
      label={config.label}
      divider
      isOpen={enabled}
      onOpenChange={toggleEnabled}
    >
      <div className="flex flex-col gap-4">
        <RuleRow
          label="Digits"
          minInput={renderNumberInput('digits', 'min')}
          maxInput={renderNumberInput('digits', 'max')}
        />
        <RuleRow
          label="Uppercase"
          minInput={renderNumberInput('uppercase', 'min')}
          maxInput={renderNumberInput('uppercase', 'max')}
        />
        <RuleRow
          label="Lowercase"
          minInput={renderNumberInput('lowercase', 'min')}
          maxInput={renderNumberInput('lowercase', 'max')}
        />
        <RuleRow
          label="Special"
          minInput={renderNumberInput('special', 'min')}
          maxInput={renderNumberInput('special', 'max')}
        />
      </div>
    </SettingsFieldSwitchWithDropdown>
  );
}

interface RuleRowProps {
  label: string;
  minInput: React.ReactNode;
  maxInput: React.ReactNode;
}

function RuleRow({ label, minInput, maxInput }: RuleRowProps) {
  return (
    <div className="flex items-center gap-2">
      <p className="typography-body3 w-24 shrink-0 text-neutral-700">{label}</p>
      <div>
        <p className="typography-body4 text-neutral-500">Min</p>
        <div className="flex gap-2">{minInput}</div>
      </div>
      <div>
        <div>
          <p className="typography-body4 text-neutral-500">Max</p>
        </div>
        <div className="flex gap-2">{maxInput}</div>
      </div>
    </div>
  );
}
